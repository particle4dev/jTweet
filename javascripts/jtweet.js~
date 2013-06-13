/**
 * jTweet - jQuery plugin 
 * @requires jQuery v1.8 or above
 * @particle4dev@gmail.com
 * Copyright (c) 2013 Steve John Hoang
 * Version: 0.0.1
 * Note: Requires jquery 1.8 or above from version 0.0.1
 */

// want to get tweets on mutil user
// ideal [search it] http://search.twitter.com/search.json?q=from:dshaw+OR+from:meteorjs&include_entities=true

(function( $ ) {
	// Declare variables to hold twitter API url and user name
	var twitter_api_url = 'http://api.twitter.com/1/statuses/user_timeline.json';
	//var twitter_api_url = 'http://search.twitter.com/search.json';
	var twitter_user		= 'meteorjs';
	var count				= 20;
	var SETTINGS 			= null;
	var COLOR = ["blue", "green", "orange", "yellow"];
	var COLORcopy;
	var TWEETMODEL = function(){
		this.created_at = "";
		this.text = "";
		this.user_mentions = [];
		this.profile_image = "";
		this.user_name = "";

		if(!COLORcopy || COLORcopy.length === 0){
			COLORcopy = COLOR.slice();
		}
		var ran = Math.random() * COLORcopy.length;
		this.color = COLORcopy.splice((ran) << 0, 1);
	};
	TWEETMODEL.prototype.filterTweet = function(tweet){
		this.user_mentions = tweet.entities.user_mentions;		
		this.created_at = timeAgo(tweet.created_at);
		this.profile_image = tweet.user.profile_image_url_https;
		this.user_name = tweet.user.from_user_name;
		this.text = ify.clean(tweet.text);
		this.user_mentions_html = "";
	};
	TWEETMODEL.prototype.makeHTML = function(){
		this.user_mentions_html = "";
		var html = "";		
		_.each(this.user_mentions, function(ia) {
			this.user_mentions_html += '<img class="speaker" src="http://api.twitter.com/1/users/profile_image/'+ia.screen_name+'" title="'+ia.screen_name+'">';
		}, this);
		html = _.template(TEMPLATE, this);
		return html;
	}
	var TWEETLIST = [];
	var indexTweet = 0;
	var TEMPLATE = '';
	//twitter_user = twitter_user.replace(/\s/g, '+OR+from:');
	//twitter_user = '?q=from:'+twitter_user.replace(/\s/g, '+OR+from:');
	/**
	* relative time calculator FROM TWITTER
	* @param {string} twitter date string returned from Twitter API
	* @return {string} relative time like "2 minutes ago"
	*/
	function timeAgo(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}
		var diff = rightNow - then;
		var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;
		if (isNaN(diff) || diff < 0) {
				return ""; // return blank string if unknown
		}
		if (diff < second * 2) {
				// within 2 seconds
				return "right now";
		}
		if (diff < minute) {
				return Math.floor(diff / second) + " seconds ago";
		}
		if (diff < minute * 2) {
				return "about 1 minute ago";
		}
		if (diff < hour) {
				return Math.floor(diff / minute) + " minutes ago";
		}
		if (diff < hour * 2) {
				return "about 1 hour ago";
		}
		if (diff < day) {
				return	Math.floor(diff / hour) + " hours ago";
		}
		if (diff > day && diff < day * 2) {
				return "yesterday";
		}
		if (diff < day * 365) {
				return Math.floor(diff / day) + " days ago";
		}
		else {
				return "over a year ago";
		}
	};
	/**
	 * The Twitalinkahashifyer!
	 * http://www.dustindiaz.com/basement/ify.html
	 * Eg:
	 * ify.clean('your tweet text');
	 */
	var ify =	{
		link: function(tweet) {
			return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
				var http = m2.match(/w/) ? 'http://' : '';
		return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
			});
		},
		at: function(tweet) {
			return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
				return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
			});
		},
		list: function(tweet) {
			return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
				return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
			});
		},
		hash: function(tweet) {
			return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
				return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
			});
		},
		clean: function(tweet) {
			return this.hash(this.at(this.list(this.link(tweet))));
		}
	};

	var methods = {
		init : function( options ) {
			SETTINGS = $.extend( {
				callback: null
			}, options);
			TEMPLATE = SETTINGS.template;		
		},
		loadInit: function(){
			var that = this;
			return this.each(function() {
				if(TWEETLIST.length == 0)
					methods.process(twitter_api_url + '?callback=?&screen_name=' + twitter_user +'&count=' + count +'&include_entities=true', SETTINGS.callback, $(this));				
				else {
					var html = '';
					var len = TWEETLIST.length
					indexTweet = 0;
					for(; indexTweet < len; indexTweet++){
						html += TWEETLIST[indexTweet].makeHTML();
					}
					if(html != ''){
						$(this).html(html);
					}
					if(SETTINGS.callback && typeof SETTINGS.callback === 'function')
						SETTINGS.callback();
				}
			});
		},
		loadMore : function(id){
			console.log('loadMore/' + id);
			if(!id){
				console.log("tweet can't load ...");
				return false;
			}
			var that = this;
			console.log(this);
			return this.each(function() {
				if(TWEETLIST.length != 0)			
					methods.process(twitter_api_url + '?callback=?&screen_name=' + twitter_user +'&count=' + count +'&include_entities=true&max_id='+ (id-1), SETTINGS.callback, $(this));
				else
					methods.process(twitter_api_url + '?callback=?&screen_name=' + twitter_user +'&include_entities=true&since_id='+ (id-1), SETTINGS.callback, $(this));
			});
		},
		process : function(url, callback, container){
			$.getJSON(
				url,
				function(data) {
					var html = '';
					var len = TWEETLIST.length
					for(; indexTweet < len; indexTweet++){
						html += TWEETLIST[indexTweet].makeHTML();
					}
					if(html != ''){
						container.html(html);	
					}								
					$.each(data, function(i, tweet) {
					//$.each(data.results, function(i, tweet) {
							
						// Before we continue we check that we got data
						if(tweet.text !== undefined) {
							// save id tweet for next , prev method
							$.fn.jTweet.idTweet = tweet.id;
							var tweetObject = new TWEETMODEL();
							tweetObject.filterTweet(tweet);
							TWEETLIST.push(tweetObject);
							html += tweetObject.makeHTML();							 
						}
					});
					indexTweet = TWEETLIST.length;	
					container.append(html);
					if(callback && typeof callback === 'function')
						callback();
					console.log(TWEETLIST);
				}
			);			
		}
	};


	$.fn.jTweet = function( method ) {
		console.log('jTweet start ...');
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			this.idTweet = null;
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +	method + ' does not exist on jQuery.jTweet' );
		}
	};
})( jQuery );