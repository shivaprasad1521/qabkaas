var PeopleView = Backbone.View.extend({
	className: 'peopleView',
	initialize: function() {
      this.people = Hula.user.get("people");
	  this.people.on('add', this.addPerson, this);
	  this.people.on('remove', this.render, this);
	  $(".nav_item").removeClass("nav_item_s");
	  $("#people_nav").addClass("nav_item_s");
    },
	render: function(){
		this.$el.empty();
		var header = $('<div id="people_header">');
		var title = $('<div class="t34 title">');
		//title.html("Friends");
		$('div.navbar-header h5#title').html("Contacts");
		header.append(title); 
		this.$el.append(header);
		var addOption = $('<div id="people_add_option">');
		var addInput = '<div id="people_add_input_h"><form id="add_person_input_form" ><input id="add_person_input" name="s" type="text" value="Enter Chat User ID..." ></input></form></div>';
		addOption.html(addInput);
		this.$el.append(addOption);
		var list = $('<div id="people_list" >');
		this.$el.append(list);
		this.people.each(this.addPerson, this);
		return this;
	},
	addPerson: function(person){
		var view = new PeopleViewPerson({model: person});
		this.$("#people_list").prepend(view.render().$el);
	},
	events: {
		'keypress #add_person_input': 'addNewPerson',
	},
	addNewPerson: function(e){
		var ID = $('#add_person_input').val();
		//if(ID !=="Enter Hularing ID..."){
		if(ID !=="Enter MySaaya ID..."){
			if(e.which == 13) {
				if(validate(ID)){
					Hula.subscribe(ID);
					 this.$('#add_person_input').val("")
					 $("#add_person_input_form")[0].reset();
					$('#add_person_input').blur().focus();					 
					e.preventDefault();
				}
			}
		}
	}
});

var PeopleViewPerson = Backbone.View.extend({
    className: 'friend_holder',
	initialize: function() {
		$(this.el).attr('id', jid_to_id(this.model.get("jid")));
		this.model.on('all', this.render, this);
		this.model.get('conversation').get('messages').on('add', this.onNewMessage, this);
    },
    render: function() {
		var img = $('<div class="friend_img_h">');
		if(this.pic() == null){
			//img.html('<img src="img/default.png" />');
			img.html('<div class="text-center"><h3><span class="entity_icon"><i class="fa fa-user"></i></span></h3></div>');
		} else {
			var img_src = 'data:'+this.picType()+';base64,'+this.pic();
			img.html('<img src="'+img_src+'" />')
		} 
		var info_h = $('<div class="friend_info_h">');
		var person_name = $('<div class="friend_name">');
		person_name.html(this.name());
		var line2 = $('<div class="friend_line2">');
		var status = this.status();
		line2.html(status);
		var option_h = $('<div class="friend_option_h">');
		option_h.html('<div class="msg_person_icon" ><h4>&gt;</h4></div>');
		if(this.ask()== "subscribe"){
			line2.prepend('<span class="pending_out">Request pending.</span>');
		}
		if(this.pending()){
			line2.prepend('<span class="pending_in">Pending authorisation!</span>');
		}
		info_h.append(person_name).append(line2);
		this.$el.html(img);
		this.$el.append(info_h);
		this.$el.append(option_h);		
		return this;
    },
    jid:        function() { return this.model.get('jid');},
    name: function() { return this.model.get('name'); },
    status: function() { return this.model.get('status'); },
    pic: function() { return this.model.get('picture').pic; },
    picType: function() { return this.model.get('picture').picType; },
    ask: function() { return this.model.get('ask'); },
    subscription: function() { return this.model.get('subscription'); },
    pending: function() { return this.model.get('pending'); },
    online: function() { return this.model.get('online'); },
	events: {
		//'click .friend_img_h': 'loadPerson',
		//'click .friend_info_h': 'loadPerson', 
		'click .msg_person_icon': 'messagePerson' 
    },
    loadPerson: function(){ 
		Hula.screen.person.render(this.model);
	},
	messagePerson: function(){
		Hula.screen.conversation.render(this.model);
	},
	onAll: function(person){
	},
	onNewMessage: function(message){
		$('#people_list #'+jid_to_id(this.jid())+' .friend_line2').html(message.get("message"));
	},
	OnStatusChange: function(change){
		$("#people_list #"+id_to_jid(this.ji())).html(this.status().toString());
	}    
});
  
var LoginView = Backbone.View.extend({ 
    attributes:{id:'login_screen'}, 
	events: {
      'click #login_button_input': 'connect'
    },
    render: function(msg) {
		if(msg != "null"){
			this.$el.html('<div id="logo" >MySaaya</div><div id="login_header" >Login</div><div id="login_error" >'+msg+'</div><div id="login_tools" > <div class="login_text" >ID</div><div class="login_input_h" ><input id="hulaID_input" type="text" /></div><div class="login_text" >Password</div><div class="login_input_h" ><input id="password_input" type="password" /></div></div><!--Sign in with your XMPP/Jabber ID.<br/> Get one here: <a style="color:white; font-size:12px;" target="_blank" href="https://xmpp.net/directory.php">Register here, if you don\'t have one</a-->');
		}else{
			this.$el.html('<div id="logo" >MySaaya</div><div id="login_header" >Login</div><div id="login_tools" > <div class="login_text" >ID</div><div class="login_input_h" ><input id="hulaID_input" type="text"  /></div><div class="login_text" >Password</div><div class="login_input_h" ><input id="password_input" type="password" /></div></div>Sign in<br/><!--a style="font-size:12px;" target="_blank" href="https://xmpp.net/directory.php">Register here, if you don\'t have one</a-->');
		}
		return this;
    },
	events: {
		'keypress #hulaID_input': 'connect',
		'keypress #password_input': 'connect'
	},
	connect: function(e) {
		if(e.which == 13) {
			var hid = $("#hulaID_input").val();
			var pass = $("#password_input").val();
			Hula.connect(hid, pass);

		}
    }
});

var PersonView = Backbone.View.extend({
	className: 'personView',
	model: null,
	stuff: null,
	toggle: false,
	initialize: function(options) {
		this.stuff = Hula.user.getAllStuff();
		this.model.on('all', this.render, this);
		this.stuff.on('all', this.render, this);
		$(".nav_item").removeClass("nav_item_s");
		$("#people_nav").addClass("nav_item_s");
    },
	render: function(){
		this.$el.empty();
		var personHeader = $('<div id="person_header">');
		var personOptions = $('<div id="person_options">');
		var personOptions_chat = $('<div class="person_options_h" id="chat_to_person" ><div id="personChatMenu" class="nav_icon"></div></div>');
		var personOptions_option = $('<div id="personOptionsMenu_" class="person_options_h" ><div id="personOptionsMenu" class="nav_icon"></div></div>');
		personOptions.append(personOptions_chat);
		personOptions.append(personOptions_option);
		var personNameJid_h = $('<div id="person_name_jid_h">');
		var person_name = $('<div id="person_name">');
		var person_jid = $('<div id="person_jid">');
		person_name.html(this.model.get("name"));
		person_jid.html(this.model.get("jid"));
		personNameJid_h.append(person_name);
		personNameJid_h.append(person_jid);
		personHeader.append(personOptions);
		personHeader.append(personNameJid_h);
		this.$el.append(personHeader);
		if(this.toggle){
			var optionsMenu = $('<div id="person_menu_options" style="display:block;"></div>');
			var view = new PersonMenuView({model: this.model});
			optionsMenu.html(view.render().$el);
		} else {
			var optionsMenu = $('<div id="person_menu_options"></div>');
		}
		this.$el.append(optionsMenu);
		if(this.model.get('picture').pic !== null){
			var personPic = $('<div id="person_pic">');
			var img_src = 'data:'+this.model.get('picture').picType+';base64,'+this.model.get('picture').pic;
			personPic.html('<img src="'+img_src+'" />')
			this.$el.append(personPic);
		}
		var personStuff = $('<div id="person_stuff">');
		var mystuff = Hula.user.getPersonStuff(this.model.get('jid'));
		for (var i = 0; i < mystuff.length; i++) {
			var stuffItem = $('<div class="stuff_item"><div class="stuff_point"></div><div class="stuff_bubble"><div class="stuff_item_time"><span data-livestamp="'+mystuff[i].get("time")+'"></span></div><div class="stuff_item_content">'+mystuff[i].get("status")+'</div></div></div>');
			personStuff.prepend(stuffItem);
		}
		this.$el.append(personStuff);	 
		return this;
	},
	events: {
		'click #personOptionsMenu_': 'toggleMenu',
		'click #chat_to_person': 'messagePerson'
	},
	
	toggleMenu: function(){ 
		var dis = this;
		$('#person_menu_options').slideToggle(100, function() {
			if(dis.toggle){
				dis.toggle = false;
				$('#person_menu_options').empty();
			} else {
				dis.toggle = true;
				dis.loadMenu();
			}
		});
	},
	loadMenu: function(){ 
		var view = new PersonMenuView({model: this.model});
		this.$("#person_menu_options").html(view.render().$el);
	},
	messagePerson: function(){
		Hula.screen.conversation.render(this.model);
	}
});


var PersonMenuView = Backbone.View.extend({
	$el: $('<div id="person_menu_options"></div>'),
	initialize: function(){
		this.model.on('all', this.render, this);
	},
	render: function(){
		this.$el.empty();
		var jid = this.model.get('jid');
		var sub = this.model.get('subscription');
		var ask = this.model.get('ask');
		var pending = this.model.get('pending');
		var subFrom = $('<div id="from_sub_h">');
		var subTo = $('<div id="to_sub_h">');
		if(sub == 'both' || sub == 'from'){
			var subIcon = $('<div class="person_option_sub_icon_h sub_ok" >');
			var subStatus = $('<div class="person_option_sub_status_h" >');
			var subOption = $('<div class="person_option_sub_option_h" >');
			subStatus.html("This person is subscribed to you and they can see your status/presence updates. You can cancel this option by selecting 'Cancel' below.");
			subOption.html('<div class="menu_person_cancel" id="personDeclineSub" >Cancel</div>');
			subFrom.append(subIcon);
			subFrom.append(subStatus);
			subFrom.append(subOption);
		} else {
			if(pending){
				var subIcon = $('<div class="person_option_sub_icon_h sub_alert" >');
				var subStatus = $('<div class="person_option_sub_status_h" >');
				var subOption = $('<div class="person_option_sub_option_h" >');
				subStatus.html("This person has requested to subscribe to you and is pending your authorisation. They cannot see your presence/status updates.");
				subOption.html('<div class="menu_person_cancel" id="personApproveSub" >Authorise their subscription</div>');
				subFrom.append(subIcon);
				subFrom.append(subStatus);
				subFrom.append(subOption);
			} else {
				var subIcon = $('<div class="person_option_sub_icon_h sub_warning" >');
				var subStatus = $('<div class="person_option_sub_status_h" >');
				var subOption = $('<div class="person_option_sub_option_h" >');
				subStatus.html("This person has is not subscribed to you. They cannot see your presence/status updates. You can automatically authorise them to subscribe to you.");
				subOption.html('<div class="menu_person_cancel" id="personApproveSub" >Auto Authorise</div>');
				subFrom.append(subIcon);
				subFrom.append(subStatus);
				subFrom.append(subOption);
			}
		}
		if(sub == 'both' || sub == 'to'){
			var subIcon = $('<div class="person_option_sub_icon_h sub_ok" >');
			var subStatus = $('<div class="person_option_sub_status_h" >');
			var subOption = $('<div class="person_option_sub_option_h" >');
			subStatus.html("You are subscribed to him and you will receive their presence/status updates. ");
			subOption.html('<div class="menu_person_cancel" id="personUnsub" onlick="Hula.unsubscribe(&#39;'+jid+'&#39;)" >Unsubscribe</div>');
			subTo.append(subIcon);
			subTo.append(subStatus);
			subTo.append(subOption);
		} else {
			if(ask =='subscribe'){
				var subIcon = $('<div class="person_option_sub_icon_h sub_alert" >');
				var subStatus = $('<div class="person_option_sub_status_h" >');
				var subOption = $('<div class="person_option_sub_option_h" >');
				subStatus.html("You are not subscribed to this person yet and your subscription request is pending authorisation.");
				subOption.html('<div class="menu_person_cancel" id="personUnsub" >Cancel Request</div>');
				subTo.append(subIcon);
				subTo.append(subStatus);
				subTo.append(subOption);
			} else {
				var subIcon = $('<div class="person_option_sub_icon_h sub_warning" >');
				var subStatus = $('<div class="person_option_sub_status_h" >');
				var subOption = $('<div class="person_option_sub_option_h" >');
				subStatus.html("You are not subscribed to this person.");
				subOption.html('<div class="menu_person_cancel" id="personSub" >Subscribe</div>');
				subTo.append(subIcon);
				subTo.append(subStatus);
				subTo.append(subOption);
			}
		}
		this.$el.append(subFrom);
		this.$el.append(subTo);
		var remove = $('<div id="person_remove_person" >');
		remove.html("Remove Person")
		this.$el.append(remove);
		return this;
	},
	events: {
		'click #personApproveSub': 'personApproveSub',
		'click #personDeclineSub': 'personDeclineSub',
		'click #personUnsub': 'personUnsub',
		'click #personSub': 'personSub',
		'click #person_remove_person': 'personRemove'
	},
	personApproveSub: function(){ 
		Hula.approveSub(this.model.get('jid'));
	},
	personDeclineSub: function(){ 
		Hula.declineSub(this.model.get('jid'));
	},
	personUnsub: function(){ 
		Hula.unsubscribe(this.model.get('jid'));
	},
	personSub: function(){ 
		Hula.subscribe(this.model.get('jid'));
	},
	personRemove: function(){ 
		Hula.screen.people();
		Hula.removePerson(this.model.get('jid'));
	}
});




var AllMessagesView = Backbone.View.extend({ 
	people: null,
	initialize: function(){ 
		this.people = Hula.user.get('people');
		this.people.on('add', this.render, this);
		$(".nav_item").removeClass("nav_item_s");
		$("#messages_nav").addClass("nav_item_s");
	},
	render:function(){
		this.$el.empty();
		var header = $('<div id="people_header">');
		var title = $('<div class="t34 title">');
		//title.html("Messages");
		$('div.navbar-header h5#title').html("Chats");
		header.html(title);
		this.$el.prepend(header);
		var list = $('<div id="people_messages_list" >');
		this.$el.append(list);
		this.people.each(this.addMessageView, this);
		return this;
	},
	addPerson: function(person){
		this.addMessageView(person);
	},
	addMessageView: function(person){
		var view = new AllMessagesViewPerson({model: person});
		this.$("#people_messages_list").append(view.render().$el);
	} 
});

var AllMessagesViewPerson = Backbone.View.extend({
	tagName:  "div",
	className: "person_message_item",
	defaults: {
		person: null
	},
	initialize: function(){
		this.model.on('all', this.render, this);
		this.model.get('conversation').get('messages').on('add', this.render, this);
		$(this.el).attr('id', jid_to_id(this.model.get("jid")));
	},
	render: function(){
		var messages = this.model.get('conversation').get('messages');
		if(messages.length > 0){
			$(this.el).addClass("active");
			var lastMessage = messages.at((messages.length-1)).get('message');
			var lastMessageTime = messages.at((messages.length-1)).get('time');
			var message = '<div class="message_item" > <div class="message_item_picture">'+Hula.getPersonPic(this.model.get('jid'))+'</div><div class="message_point"></div><div class="message_bubble">	<div class="message_item_time"><span data-livestamp="'+lastMessageTime+'"></span></div><div class="message_item_name">'+this.model.get('name')+'</div> <div class="message_item_body"> <div class="message_item_content">'+lastMessage+'</div></div></div></div>';
			this.$el.html(message);
			$("#people_messages_list #"+jid_to_id(this.model.get('jid'))).remove();
			$("#people_messages_list").prepend(this.$el)
			return this;
		} else {
			this.$el.html(this.model.get('name')+": "+messages.length+" MESSAGES");
			return this;
		}
	},
	events: {
		'click' : 'openConvo'
	},
	openConvo: function(){
		Hula.screen.conversation.render(this.model);
	}
});

var ConversationView = Backbone.View.extend({
	initialize: function(){
		this.model.get('conversation').get('messages').on('add', this.newMessage, this);
		this.model.get('conversation').on("change", this.convoStatus);
		$(".nav_item").removeClass("nav_item_s");
		$("#messages_nav").addClass("nav_item_s");
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	},
	render: function(){
		var messages = this.model.get('conversation').get('messages');
		var header = $('<div id="cperson_header" >');
		var deleteConvo =  $('<div id="cperson_delete_convo" >');
		var personPic =  $('<div id="cperson_pic" >');
		var person_name_jid =  $('<div id="cperson_name_jid_h" >');
			var person_name =  $('<div id="cperson_name" >');
			var person_jid =  $('<div id="cperson_jid" >');
				person_name.html(this.model.get('name'));
				person_jid.html(this.model.get('jid'));
		personPic.html(Hula.getPersonPic(this.model.get('jid')));
		person_name_jid.append(person_name);
		$('div.navbar-header h5#title').html(person_name);
		person_name_jid.append(person_jid);
		header.append(deleteConvo);
		header.append(personPic);
		header.append(person_name_jid);
		this.$el.html(header);
		var list = $('<div id="convo_list" >');
		this.$el.append(list);
		var status = $('<div id="convo_status" >'); 
		this.$el.append(status);
		messages.each(this.addMessage, this);
		var input = $('<div id="message_input_h" >');
		input.html('<form id="message_input_form"><textarea id="message_input" name="s" type="text" >Type here...</textarea></form>');
		this.$el.append(input);
		return this;
	},
	addMessage: function(message){
		var person;
		if(message.get('owner')==Hula.user.get('jid')){
			person = Hula.user;
		} else {
			person = Hula.user.findPerson(message.get('owner'));
		}
		var messageView = new ConversationViewItem({message:message, model:person});
		this.$("#convo_list").append(messageView.render().$el);
	},
	newMessage: function(message){
		this.addMessage(message);
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	},
	events: {
		'keypress #message_input': 'sendMessage'
	},
	sendMessage: function(e){
		var message = $('#message_input').val();
		if(message !=="Type here..."){
			if(e.which == 13) {
				Hula.sendMessage(this.model.get('jid'), message);
				$("#message_input_form")[0].reset();
				$('#message_input').blur().focus();
				$("html, body").animate({ scrollTop: $(document).height() }, "slow");
				e.preventDefault();
			}
		}
	},
	convoStatus: function(change){
		$("#convo_status").html(change.get('state'));
	}
});

var ConversationViewItem = Backbone.View.extend({
	message: null,
	initialize: function(options){
		this.message = options.message;
		this.model.on('all', this.render, this);
	},
	render: function(){
		var message = '<div class="message_item"  > <div class="message_item_picture">'+Hula.getPersonPic(this.message.get('owner'))+'</div><div class="message_point"></div><div class="message_bubble">	<div class="message_item_time"><span data-livestamp="'+this.message.get('time')+'"></span></div><div class="message_item_name">'+this.model.get('name')+'</div> <div class="message_item_body"> <div class="message_item_content">'+this.message.get('message')+'</div></div></div></div>';
		this.$el.html(message);
		return this;
	}
});


var StuffView = Backbone.View.extend({
	initialize: function(){ 
		this.stuff = Hula.user.getAllStuff();
		this.stuff.on('add', this.newStuff, this);
		$(".nav_item").removeClass("nav_item_s");
		$("#stuff_nav").addClass("nav_item_s");
	},
	render: function(){
		this.$el.empty();
		var header = $('<div id="people_header">');	
		var title = $('<div class="t34 title">');
		//title.html("Stuff");
		$('div.navbar-header h5#title').html("Stuff");
		header.html(title); 
		var stuff_hula = $('<div id="stuff_hula"></div>');
		var stuff_list = $('<div id="stuff_holder"></div>');
		var stuff_stuff = '<div id="stuff_my_stuff"> <form id="mystuff_input_form"><textarea id="mystuff_input" type="text" >What are you on?</textarea></form> </div>';
		stuff_hula.append(stuff_stuff);
		this.$el.append(header);
		this.$el.append(stuff_hula);
		this.$el.append(stuff_list);
		this.stuff.each(this.addStuff, this);
		return this;
	},
	addStuff: function(stuff){
		var person;
		if(stuff.get('owner') == Hula.user.get('jid')){
			person = Hula.user;
		} else {
			person = Hula.user.findPerson(stuff.get('owner'));
		}
		var stuffItem = new StuffViewItem({stuff: stuff, model: person});
		this.$("#stuff_holder").prepend(stuffItem.render().$el);
	},
	newStuff: function(stuff){
		this.addStuff(stuff);
	},
	events: {
		'keypress #mystuff_input': 'hula'
	},
	hula: function(e){
		var stuff = $('#mystuff_input').val();
		if(stuff !=="What are you on?"){
			if(e.which == 13) {
				Hula.sendStatus(stuff);
				$("#mystuff_input_form")[0].reset();
				$('#mystuff_input').blur().focus(); 
				e.preventDefault();
			}
		}
	}
});

var StuffViewItem = Backbone.View.extend({
	className: 'message_item',
	initialize: function(options){ 
		this.stuff = options.stuff;
		this.model.on('all', this.render, this);
	},
	render: function(){
		var hash = this.model.get('picture').pic;
		var type = this.model.get('picture').picType;
		var stuff = '<div class="message_item_picture">'+Hula.makePersonPic(hash, type)+'</div><div class="message_point"></div><div class="message_bubble"><div class="message_item_time"><span data-livestamp="'+this.stuff.get('time')+'"></span></div><div class="message_item_name">'+this.model.get('name')+'</div><div class="message_item_body"><div class="message_item_content">'+this.stuff.get('status')+'</div></div></div>';
		this.$el.html(stuff);
		return this;
	},
	events: {
		'click': 'loadPerson'
	}, 
	loadPerson: function(){
		Hula.screen.person.render(this.model);
	}
});

var Stuff = Backbone.Model.extend({
	defaults: {
		owner: null,
		status: null,
		time: null
	}
});

var Stuffs = Backbone.Collection.extend({ 
    model: Stuff 
});


var Message = Backbone.Model.extend({
	defaults: {
		owner: null,
		message: null,
		time: null
	}
});

var Messages = Backbone.Collection.extend({ 
    model: Message 
}); 

var Conversation = Backbone.Model.extend({ 
    defaults: { 
		messages: null,
		state: 'none'
	},
	initialize: function(){
		this.set('messages', new Messages());
	
	},
	addMessage: function(owner, message, time){
		var newMessage = new Message();
		newMessage.set({owner: owner, message: message, time: time});
		this.get('messages').add(newMessage);
		document.getElementById('ping').play();
	},
	updateState: function(state){ this.set('state', state);}
    
}); 

 

var Person = Backbone.Model.extend({	
	defaults: {
		jid : null,
		name : null, 
		online: false, 
		status : null, 
		picture : { 
			pic : null, 
			picType : null
		},
		subscription: 'none',
		ask: null, 
		pending: false, 
		counter: { messages:0, stuff:0 },
		conversation: null
	},
	initialize: function(){
		this.set('conversation', new Conversation());	
    },
	updateName: function(name){this.set("name", name);},
	updateOnline: function(online){this.set("online", online);},
	updatePicture: function(picture){ this.set("picture", picture);},
	updateSubscription: function(subscription){this.set("subscription", subscription) ;},
	updateAsk: function(ask){this.set("ask", ask);},
	updateStatus: function(status){this.set("status", status);},
	updatePending: function(pending){this.set("pending", pending);}
})


var People = Backbone.Collection.extend({
	model: Person
});

var User = Backbone.Model.extend({
	defaults: {
		jid: null,
		password: null,
		name : null, 
		status : null, 
		picture : { 
			pic : null, 
			picType : null
		},
		people: new People(),
		stuff: new Stuffs()
	},
	getPeople: function(){ return Hula.user.get("people");},
	findPerson: function(jid){
		var people = Hula.user.get("people").models;
		var person = false;
		$.each( people, function( key, value ) {
			if (value.get("jid") === jid) {
				person =  Hula.user.get("people").at(key);
			}
		});
		return person;
	},
	addPerson: function(jid, name, subscription, ask){
		var person = this.findPerson(jid);
		if(!person){
			this.get("people").add(new Person({jid: jid, name: name, subscription: subscription, ask: ask}));
		}
	},
	removePerson: function(jid){
		var person = this.findPerson(jid);
		var people = this.getPeople();
		people.remove(person);
	},
	getAllStuff: function(){
		return this.get("stuff");
	},
	getPersonStuff: function(jid){ 
		var stuffs = this.getAllStuff().models;
		var stuff = false;
		var stuffArray = new Array();
		$.each( stuffs, function( key, value ) {
			if (value.get("owner") === jid) {
					stuff;
					stuffArray.push(value);
			}
		});	
		if(stuffArray.length > 0){
			stuff = stuffArray;
		}	
		return stuff;
	},
	addStuff: function(person, status, time){
		var stuff = new Stuff();
		stuff.set({owner: person,	status: status, time: time});
		var stuffs = this.getAllStuff();
		stuffs.add(stuff);
	}
})



var Hula = {
	loggedIn: false,
	user: new User(),
    connection: {
		status: 0,
		tool: null,
		//bosh: 'http://bosh.metajack.im:5280/xmpp-httpbind',
		//bosh: 'http://localhost:5280/http-bind/',
		//bosh: 'http://bind.jabbim.cz/http-bind/',
		bosh: 'http://104.131.43.233:5280/http-bind/',
		manager: function(status){
			 if (status === Strophe.Status.CONNECTED) {
				$('#conn_status').html("Connected, getting contact list...");
				Hula.connection.status = status;
				Hula.onLoginSuccess(); 
			 } else if (status === Strophe.Status.AUTHENTICATING) {
				//$('#conn_status').html("Authenticating...");
				$('#conn_status').html('<div id="loading"><i id="loading-image" class="fa fa-refresh fa-spin fa-4x"></i></div>');
				Hula.connection.status = status;
			 } else if (status === Strophe.Status.CONNECTING) {
				//$('#conn_status').html("Connecting...");
				$('#conn_status').html('<div id="loading"><i id="loading-image" class="fa fa-refresh fa-spin fa-4x"></i></div>');
				//$('#conn_status').html("Loading...");
				Hula.connection.status = status;
			 } else if (status === Strophe.Status.ATTACHED) {
				//$('#conn_status').html("Re-Attach of connection successful. Triggering re-attached...");
				Hula.connection.status = status;
			 } else if (status === Strophe.Status.DISCONNECTED) {
				$('#conn_status').html("Disconnected.");
				Hula.connection.status = status;
				if(Hula.loggedIn){
					Hula.disconnect();
					Hula.connect(Hula.user.get("jid"), Hula.user.get("password"));
				} else{
					Hula.loadLogin($("#hula"));
				}
			 } else if (status === Strophe.Status.DISCONNECTING) {
				$('#conn_status').html("XMPP/Strophe is Dis-Connecting...");
				Hula.connection.status = status;
			 } else if (status === Strophe.Status.CONNFAIL) {
				$('#conn_status').html("MySaaya reported connection failure...attempt to re-attach...");
				Hula.onLoginError("Connection to server failed");
				Hula.connection.status = status;
			 } else if (status === Strophe.Status.AUTHFAIL) {
				Hula.connection.status = status;	
				$('#conn_status').html("Authentication failed. Bad password or username.");
				Hula.onLoginError("Authentication failed. Bad password or username.");
			 }
			 else
				$('#conn_status').html("Strophe connection callback - unhandled status = " + status);
				Hula.connection.status = status;
		},
		connected: function(){
			var iq = $iq({type: "get"}).c("query", {xmlns: Strophe.NS.ROSTER});
		},
		disconnected: function(){},
		reconnect: function(){}
	},
	router: null,
	boot: function(container){
		var router = new Router({el: container})
		Hula.router = router;
		Backbone.history.start();
	},
	loadLogin: function(container){
		/*var loginView = new LoginView();
		container.empty();
		container.html(loginView.render("null").el);*/
		//set username, password and login automatically when the page is loaded
		
		//Hula.connection.tool = null;
		/*Hula.connect(window.localStorage.getItem('profileTitle'), window.localStorage.getItem('password'));
		Hula.connection.tool = null;
		Hula.user.set({jid: window.localStorage.getItem('profileTitle'), password: window.localStorage.getItem('password')});
		$('#hula').html('<span id="conn_status" >Loading...</span><div id="loading"><img src="img/loading.gif" /></div>')
		var conn = new Strophe.Connection(Hula.connection.bosh);
		setTimeout(function() {
            conn.connect(hid, pass,Hula.connection.manager);
        }, 500);
		Hula.connection.tool = conn;*/

		Hula.connect(window.localStorage.getItem('profileTitle')+'@localhost', window.localStorage.getItem('password'));
		//this.connect(window.localStorage.getItem('profileTitle'), window.localStorage.getItem('password'));
		/*hid = window.localStorage.getItem('profileTitle');
		pass = window.localStorage.getItem('password');
		this.user.set({jid: hid, password: pass});
		$('#hula').html('<span id="conn_status" >Loading...</span><div id="loading"><img src="img/loading.gif" /></div>')
		var conn = new Strophe.Connection(Hula.connection.bosh);
		setTimeout(function() {
            conn.connect(hid, pass,Hula.connection.manager);
        }, 500);
		this.connection.tool = conn;*/
	},
	onLoginError: function(msg){
		var loginView = new LoginView();
		$("#hula").empty();
		$("#hula").html(loginView.render(msg).el);
	},
	connect: function(hid, pass){
		Hula.connection.tool = null;
		Hula.user.set({jid: hid, password: pass});
		$('#hula').html('<div id="loading"><i id="loading-image" class="fa fa-refresh fa-spin fa-4x"></i></div>');
		var conn = new Strophe.Connection(Hula.connection.bosh);
		setTimeout(function() {
            conn.connect(hid, pass,Hula.connection.manager);
        }, 500);
		Hula.connection.tool = conn;
	},
	disconnect: function(){
		Hula.connection.tool.flush();
		Hula.connection.tool.sync = true;
		Hula.connection.tool.disconnect();
	},
	onLoginSuccess: function(){
		Hula.loggedIn = true;
		if (Modernizr.localstorage) {
			localStorage.setItem("user", JSON.stringify( {loggedIn: true, jid: Hula.user.get("jid"), password:Hula.user.get("password") } ));
			var userData = JSON.parse(localStorage.getItem("user"));
		}
		$("#hula").html('<div id="screen" ></div>');
		Hula.addHandlers();
		//$("#hula").append('<div id="clear"></div><div id="navigation" ><div class="nav_item " id="home_nav" onclick="Hula.logout()"><div class="nav_icon" id="home_icon" ></div></div><div class="nav_item" id="people_nav" onclick="Hula.screen.people()" title="Friends" ><div class="nav_icon" id="people_icon" ></div></div><div class="nav_item " id="messages_nav" onclick="Hula.screen.messages()" title="Messages" ><div class="nav_icon" id="messages_icon" ></div></div><div class="nav_item " id="stuff_nav" onclick="Hula.screen.stuff()" title="Stuff" ><div class="nav_icon" id="stuff_icon" ></div></div></div>');
		$("#hula").append('<div id="clear"></div>');
		var iq = $iq({type: "get"}).c("query", {xmlns: Strophe.NS.ROSTER});
		Hula.connection.tool.send(iq);
		setTimeout(function(){ Hula.getVCard(Hula.user.get('jid'))},5000);
		
		//Hula.screen.people();
		Hula.screen.messages();
	},
	addHandlers: function(){
		Hula.connection.tool.addHandler(Hula.handleAll, null, null);		
		Hula.connection.tool.addHandler(Hula.handlePresence, null, "presence");
		Hula.connection.tool.addHandler(Hula.onRosterResult, Strophe.NS.ROSTER, null, "result", null, null, null);
		Hula.connection.tool.addHandler(Hula.onRosterSet, Strophe.NS.ROSTER, null, 'set', null, null, null);
		Hula.connection.tool.addHandler(Hula.onMessage, null, 'message', null, null, null, null);
	},
	sendInitPresence: function(){
		//var pres = $pres().c('status').t("Hularing.me").tree();
		var pres = $pres().c('status').t("mysaaya.com").tree();
		Hula.connection.tool.send(pres);
	},
	logout: function(){
		Hula.loggedIn = false;
		localStorage.setItem("user", JSON.stringify( {loggedIn: false, jid: Hula.user.get("jid"), password:Hula.user.get("password") } ));
		var userData = JSON.parse(localStorage.getItem("user"));
		Hula.disconnect();
	},
	screen: {
		current: 3,
		login: function(){},
		home: function(){},
		menu: {
			current: null,
			render: function(){ }
		},
		people: function(){	
			var peopleView = new PeopleView();
			$("#screen").empty();
			$("#screen").html(peopleView.render().$el);
		},
		person: {
			current: null,
			render: function(model){	
				var personView = new PersonView({model: model});
				$("#screen").empty();
				$("#screen").html(personView.render().$el);
			}
		},
		messages: function(){	
			var messagesView = new AllMessagesView();
			$("#screen").empty();
			$("#screen").html(messagesView.render().$el); 	
		},
		conversation: {
			current: null,
			render: function(person){	
				var conversationView = new ConversationView({model: person});
				$("#screen").empty();
				$("#screen").html(conversationView.render().$el);
			}
		},
		stuff: function(){
			var stuffView = new StuffView();
			$("#screen").empty();
			$("#screen").html(stuffView.render().$el);
		},
		
	},
	onRosterResult: function(roster){
		if($(roster).attr('type') !== "error"){
			if($(roster).find('item').length > 0){
				$(roster).find('item').each(function(){
					var jid = $(this).attr('jid'); 
					var name = $(this).attr('name') || jid;
					var subscription = "none"; 
					if($(this).attr('subscription')){
						subscription = $(this).attr('subscription');
					}
					var ask = null;
					if($(this).attr('ask')){
						ask = $(this).attr('ask');
					}
					var person = Hula.user.findPerson(jid);
					if(!person){
						Hula.user.addPerson(jid, name, subscription, ask);
					} else {
						person.updateSubscription(subscription);
						person.updateAsk(ask);
						}						
					});
				
			} else {}
			Hula.sendInitPresence();
			
		} else {}
		return true;
	},
	onRosterSet: function(roster){
		if($(roster).attr('type') !== "error"){
			var item = $(roster).find('item');
			var jid = item.attr('jid'); 
			var name = item.attr('name') || jid;					
			var subscription = "none"; 
			var ask = null;
			if(item.attr('subscription')){subscription = item.attr('subscription');}
			if(item.attr('ask')){ask = item.attr('ask');}
			if(item.attr('subscription') === 'remove'){
				Hula.user.removePerson(jid);					
			} else {
				var person = Hula.user.findPerson(jid);
				if(!person){
					Hula.user.addPerson(jid, name, subscription, ask);
					Hula.getVCard(jid);
				} else {
					person.updateSubscription(subscription);
					person.updateAsk(ask);
					if(subscription=="from" || subscription=="both"){person.updatePending(false)};
					Hula.getVCard(jid);
				}
			}
		} else {}
		return true;
	},
	handleVCard: function(vcard){
		var from = Strophe.getBareJidFromJid($(vcard).attr('from'));
		if(from == Hula.user.get('jid')){
			var vCard = $(vcard).find("vCard");
			var name;
			if($(vcard).find("FN").text() == null || $(vcard).find("FN").text() == ""){
				name = from;
			}else{
				name = $(vcard).find("FN").text();
			}; 
			Hula.user.set("name", name);
			var photo = vCard.find("PHOTO");
			var type = photo.find('TYPE').text();
			var img = photo.find('BINVAL').text();
			if($(photo).children().length > 0){
				Hula.user.set({picture: {pic: img, picType: type}});
			}
		} else {
			var person = Hula.user.findPerson(from);
			var vCard = $(vcard).find("vCard");
			var name;
			if($(vcard).find("FN").text() == null || $(vcard).find("FN").text() == ""){
				name = from;
			}else{
				name = $(vcard).find("FN").text();
			}; 
			person.set("name", name);
			var photo = vCard.find("PHOTO");
			var type = photo.find('TYPE').text();
			var img = photo.find('BINVAL').text();
			if($(photo).children().length > 0){
				person.set({picture: {pic: img, picType: type}});
			} else {}
		}
		return true;
	},
	getVCardAll: function(){
		var len = Hula.user.get("people").models.length;
		asyncLoop({
			functionToLoop : function(loop, i){
				setTimeout(function(){
					var user = Hula.user.get("people").at(i);
					var jid = user.get("jid");
					var iq = $iq({type: 'get', to: jid}).c('vCard', {xmlns: 'vcard-temp'}).tree();
					Hula.connection.tool.sendIQ(iq, Hula.handleVCard);
					loop();
				},1000);
			},
			callback : function(){}    
		});
	},
	getVCard: function(jid){
		if(jid == Hula.user.get('jid')){
			var iq = $iq({type: 'get'}).c('vCard', {xmlns: 'vcard-temp'}).tree();
			Hula.connection.tool.sendIQ(iq, Hula.handleVCard);
		} else {
			var iq = $iq({type: 'get', to: jid }).c('vCard', {xmlns: 'vcard-temp'}).tree();
			Hula.connection.tool.sendIQ(iq, Hula.handleVCard);
		}		
	},
	handlePresence: function(presence){
		if($(presence).attr('type') !== "error"){
			var from = Strophe.getBareJidFromJid($(presence).attr('from'));
			var me = Hula.user.get("jid");
			var time = Hula.getTime();
			if(from === me){
				var ptype = $(presence).attr('type');
				if (ptype == "unavailable"){
					//var pres = $pres().c('status').t("Hularing").tree();
					var pres = $pres().c('status').t("Hularing").tree();
					Hula.connection.tool.send(pres);
				} 
			} else {
				var ptype = $(presence).attr('type');
				Hula.getVCard(from);
				if(ptype){
					if(ptype == "subscribe"){
						if(Hula.user.findPerson(from)){
							var person = Hula.user.findPerson(from);
							person.updatePending(true);
						} else {
							var newPerson = new Person();
							newPerson.set("jid", from);
							newPerson.set("name", from);
							newPerson.set("pending", true);
							Hula.user.get("people").add(newPerson);
						}
					} else if(ptype == "subscribed"){
						var person = Hula.user.findPerson(from);
						person.updatePending(false);
					} else if(ptype == "unsubscribe"){					
					} else if(ptype == "unavailable"){
						var person = Hula.user.findPerson(from);
						person.updateOnline(false);
					}   
				} else {
					var from = Strophe.getBareJidFromJid($(presence).attr('from'));
					var person = Hula.user.findPerson(from);
					person.updateOnline(true);
					if($(presence).find('status').length >0){
						if(status!==null | status!==""){
							var status = $(presence).find('status').text();
							person.updateStatus(status);
							Hula.user.addStuff(from, status, time);
						}  
					}
				}
			}
		} else { }
		return true;
	},
	handleAll: function(we){
		return true;
	},
	subscribe: function(jid){
		var iq = $pres({to: jid, type: "subscribe"}).tree();
		Hula.connection.tool.send(iq);
	},
	unsubscribe: function(jid){
		var iq = $pres({to: jid, type: "unsubscribe"}).tree();
		Hula.connection.tool.send(iq);
	},
	approveSub: function(jid){
		var iq = $pres({to: jid, type: "subscribed"}).tree();
		Hula.connection.tool.send(iq);
	},
	declineSub: function(jid){
		var iq = $pres({to: jid, type: "unsubscribed"}).tree();
		Hula.connection.tool.send(iq);
	},
	addPerson: function(jid){
		var iD = makeID();
		var me = Hula.user.get("jid");
		var iq = $iq({from:me, type: "set", id:iD}).c("query", {xmlns: Strophe.NS.ROSTER}).c("item", {jid:jid}).tree();
		Hula.connection.tool.send(iq);
		Hula.subscribe(jid);
	},
	removePerson: function(jid){
		var iD = makeID();
		var iq = $iq({type: "set", id:iD}).c("query", {xmlns: Strophe.NS.ROSTER}).c("item", {subscription:"remove", jid:jid}).tree();
		Hula.connection.tool.send(iq);
	},
	onSubscribe: function(presence){return true;},
	onMessage: function(message){
		if($(message).attr('type') !== "error"){
			var from = Strophe.getBareJidFromJid($(message).attr('from'));
			var time = Hula.getTime();
			if($(message).find('body').length !== 0){ 
				var body = $(message).find('body').text();
				var person = Hula.user.findPerson(from);
				if(person){
					var personConvo = person.get('conversation');
					personConvo.addMessage(from, body, time);
				} else {
					Hula.user.addPerson(from, from, 'none', null);
					var person = Hula.user.findPerson(from);
					var personConvo = person.get('conversation');
					personConvo.addMessage(from, body, time);
				}
			} else {
				if($(message).find('active').length !== 0){
					var person = Hula.user.findPerson(from);
					var personConvo = person.get('conversation');
					personConvo.updateState("Active");
				} else if($(message).find('composing').length !== 0){
					var person = Hula.user.findPerson(from);
					var personConvo = person.get('conversation');
					personConvo.updateState("Composing");
				} else if($(message).find('paused').length !== 0){
					var person = Hula.user.findPerson(from);
					var personConvo = person.get('conversation');
					personConvo.updateState("Paused");
				} else {} 
			}
		}
		return true;
	},	
	getPersonPic: function(jid){
		var person
		if(jid == Hula.user.get('jid')){
			person = Hula.user;
		} else {
			person = Hula.user.findPerson(jid);
		}
		var hash = person.get('picture').pic;
		var type = person.get('picture').picType;
		
		if(hash == null){
			//return '<img src="img/default.png" />';
			return '<div class="text-center"><h3><span class="entity_icon"><i class="fa fa-user"></i></span></h3></div>';
		} else {
			var img_src = 'data:'+type+';base64,'+hash;
			return'<img src="'+img_src+'" />';
		}
	},
	makePersonPic: function(hash, type){
		if(hash == null){
			//return '<img src="img/default.png" />';
			return '<div class="text-center"><h3><span class="entity_icon"><i class="fa fa-user"></i></span></h3></div>';
		} else {
			var img_src = 'data:'+type+';base64,'+hash;
			return'<img src="'+img_src+'" />';
		}
	},
	getTime: function(){
		return moment().unix();
	},
	sendStatus: function(status){
		var pres = $pres().c('status').t(status).tree();
		Hula.connection.tool.send(pres);
		Hula.user.addStuff(Hula.user.get('jid'), status, Hula.getTime());
	},
	sendMessage: function(to, message){
		var person = Hula.user.findPerson(to);
		var personConvo = person.get('conversation');
		personConvo.addMessage(Hula.user.get('jid'), message, Hula.getTime());
		var msg = $msg({from: Hula.user.get('jid'), to:to, type:'chat'}).c('body').t(message).tree();
		Hula.connection.tool.send(msg);
	}
}
window.Hula = Hula;

var Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index",
	  "friends": "friends"
    },
    index: function() {
		
		if(localStorage.getItem("user") !== null){
			if(JSON.parse(localStorage.getItem("user")).loggedIn){
				var jid = JSON.parse(localStorage.getItem("user")).jid;
				var password = JSON.parse(localStorage.getItem("user")).password;
				Hula.connect(jid,password);
			} else {
				Hula.loadLogin(this.el);
			}
		} else{
			Hula.loadLogin(this.el);
		}
		if(Hula.loggedIn){}
		else{}
    },
	friends: function(){
		Hula.screen.people();
	}
});

function makeID(){
	return Math.random().toString(36).substring(7);
}

$(document).ready(function(){
	if (Modernizr.localstorage) {} else {}
	Hula.boot($('#hula'));
	$(document).on('focusin', '#mystuff_input', function(){ if(this.value== 'What are you on?'){this.value='';} $("#navigation").fadeOut(50); })
	$(document).on('focusout', '#mystuff_input', function(){ if(this.value== ''){this.value='What are you on?';} $("#navigation").fadeIn(50); })
	$(document).on('focusin', '#add_person_input', function(){ if(this.value== 'Enter Chat User ID...'){this.value='';} $("#navigation").fadeOut(50); })
	$(document).on('focusout', '#add_person_input', function(){ if(this.value== ''){this.value='Enter Chat User ID...';} $("#navigation").fadeIn(50); });
	$(document).on('focusin', '#message_input', function(){ if(this.value== 'Type here...'){this.value='';} $("#navigation").fadeOut(50); })
	$(document).on('focusout', '#message_input', function(){ if(this.value== ''){this.value='Type here...';} $("#navigation").fadeIn(50); });
});
/*$(window).on('beforeunload', function(){  return "Chat is still running...";});
var asyncLoop = function(o){
    var i=-1;
    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    } 
    loop();
}*/

function jid_to_id (jid) {
        return Strophe.getBareJidFromJid(jid)
            .replace(/@/g, "_")
            .replace(/\./g, "-");
}

function id_to_jid(jid) {
        return Strophe.getBareJidFromJid(jid)
            .replace(/_/g, "@")
            .replace(/\-/g, ".");
}

function validate(jid) {  
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(jid);
}