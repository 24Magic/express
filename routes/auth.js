var express = require('express');
var router = express.Router();

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy
var JirenguStrategy = require('passport-jirengu').Strategy


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
})

passport.use(new JirenguStrategy({
	clientID: 'e02877eb869bd29c0d6d1d03322c6903a67a555d0bda1ead721b0acf49f011fd',
	tokenURL: 'http://user.jirengu.com/oauth/token',
	clientSecret: '46b03c2ef97d1479221fc59f4550348d922daa48ffbef30abe0efbf474280313',
	callbackURL: "http://gzbamboo.org/auth/jirengu/callback"},
	function(accessToken, refreshToken, profile, done){
	  done(null, profile)
	} 
))

passport.use(new GitHubStrategy({
	clientID: '42d7ccd010f5ff08455b',
    clientSecret: 'd6529d35e57a5e27d4a533364fcfe43754c88118',
    callbackURL: "http://gzbamboo.org/auth/github/callback"
	},
	function(accessToken, refreshToken, profile, done){
	  done(null, profile)
	}
))

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', 
	passport.authenticate('github', {failureRedirect: '/login'}),
	function(req, res){
		req.session.user = {
			id: req.user.id,
			username: req.user.displayName || req.user.username,
			avatar: req.user._json.avatar_url,
			provider: req.user.provider
		}
		res.redirect('/')
	}
)

router.get('/normal', passport.authenticate('jirengu'))
router.get('/jirengu/callback', 
	passport.authenticate('jirengu', {failureRedirect: '/login'}),
	function(req, res){
		console.log(req.user)
		req.session.user = {
			id: req.user._json.uid,
			username: req.user._json.name,
			avatar: req.user._json.avatar,
			provider: req.user.provider
		}
		res.redirect('/')
	}
)

router.get('/logout', function(req, res){
	req.session.destroy()
	res.redirect('/')
})

module.exports = router;
