if (Meteor.isClient) {
	Meteor.startup(function () {
			$.fn.jTweet({
				template: '<li class="box <%= color %> white-font">'+
					'<div class="body-box">'+
						'<h2 class="title light">'+
							'<%= created_at %>'+
							'<img src="<%= profile_image %>" class="" title="<%= user_name %>" style="height:24px; width: 24px; float: right;">'+
						'</h2>'+
						'<div><%= text %></div>'+
						'<div class="wrap-div"><%= user_mentions_html %></div>'+
					'</div>'+
				'</li>',
				callback: function(){
					$(function () {
						$('.antiscroll-inner').height($(window).height()-96-45);
						$('.antiscroll-wrap').antiscroll();
					});
				}
			})
			$('.tweetsList_meth').jTweet('loadInit');
			$('.loadMoreTweet_meth').click(function(){
				$('.tweetsList_meth').jTweet('loadMore', $.fn.jTweet.idTweet);
			});
	});
}
