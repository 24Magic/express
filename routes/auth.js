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
	clientID: '9b30f455b3ca97432fda3101b0cca7091c1258e85baa2e07bdcd0f9660de6967',
	tokenURL: 'http://user.jirengu.com/oauth/token',
	clientSecret: '1ef66b0cf9a22e3f5826871af19c32b3e06be096611258e370037caafe1e0e73',
	callbackURL: "http://localhost:4000/auth/jirengu/callback"},
	function(accessToken, refreshToken, profile, done){
	  done(null, profile)
	} 
))

passport.use(new GitHubStrategy({
	clientID: 'a259f2e0a13c6dac105f',
    clientSecret: '338179738d7fa9274db1fa41a0190fa143cc238e',
    callbackURL: "http://localhost:4000/auth/github/callback"
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



