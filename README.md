Novacroft
=========

Ucan-do-it Front-End
--------------------

### Setup

1. Install Node.JS

2. Install the Gulp task runner globally (as root/adminstrator):  

	```
	npm install -g gulp
	```

3. Install dependencies in `package.json` by running:  

	```
	npm install
	```

4. Run a pre-defined Gulp build task from `gulpfile.js`

	1. Output HTML/CSS/JS into the `/dist` directory:  


        ```
        gulp
        ```


	2. As above, but auto-refresh changes when saving 


        ```
        gulp dev
        ```


	3. Run JavaScript API unit tests


        ```
        gulp test
        ```