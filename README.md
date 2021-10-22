# Waves - Custom Frontend From Scratch

## Project Info

You and your team have been contacted by a local, elusive client. They have a new product and they need a responsive website built for them in order to market it online. They know you’ve got just the right skillset to craft their vision. Secretive as they are, they have decided to NOT give you details about their company nor give you details on the product they are selling. Instead, they hand over to you a simple word, which they want you to interpret in order to build the best possible responsive website for them to use as a marketing tool. The sentence they give you is:

### "Waves"

You and your team are tasked with the following:

- Build a 1-3 page website for the product you believe they are selling based on their prompt
- Your website must be locally hosted
- Your website must integrate at least 3 of the following components:
	- CSS Framework(s) (e.g. Bootstrap, Semantic UI, etc.)
	- JavaScript framework(s)
	- Utilizing a third-party API
	- A backend with a storage system
	- CSS Preprocessor
	- Accessibility
	- Cookies
	- Forms

## Description

I chose to interpret "waves" as "soundwaves" in order to design the website for an imaginary recording studio.

The site consists of 3 pages:
- Homepage (index.html)
- Gallery page (gallery.html)
- Contact page (contact.html)

A detailed explanation of design choices and fun elements on each page can be found [here](). Some features are summarized below in the Features section.

This website integrates the following components as required:
- CSS Framework (specifically Bootstrap)
- JavaScript framework (specifically jQuery)
	- Includes jQuery plugins:
		- [slick](https://kenwheeler.github.io/slick/) - carousels made easy
		- [jQuery Validation](https://jqueryvalidation.org/) - form validation made easy
- Utilizing a third-party API (specifically [Spotify](https://developer.spotify.com/))
- Accessibility (checked with [axe Dev Tools](https://www.deque.com/axe/devtools/) - issues are manual review for sufficient color contrast of text against images)
- Forms (form submits and info is lost forever - no backend storage system or cookies implemented)

## Installation

### 1. Install

Clone the repository into your system with the command:

```
git clone git@github.com:RLewis11769/waves_custom-frontend.git
```

### 2. Run

Run the server-side server with the command:

```
python3 -m http.server
```

### 3. View

The client-side server will be available to view in your web browser at:

```
localhost:8000
```

## Features

## Bugs

I'm not sure I'd call it a bug, but console is populated with error messages after loading Gallery page with multiple occurrences of the following messages:
- Failed to load resource: the server responded with a status of 429 (Too Many Requests)
- DevTools failed to load source map: Could not load content for https<nolink>://open.scdn.co/cdn/build/embed/embed.8106038c.js.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE

However, everything loads properly and "failures" to load don't appear to affect anything.

If you find any bugs, please contact Rachel Lewis at 2708@holbertonschool.com.

There are several things I decided not to implement, however. These include:
- Form does not save data on submit
- Playlist is hardcoded (and will be deleted)
- Spotify API IDs are not encoded (and will be reset)
- No loading indicator (especially noticeable on Gallery page when embedded songs are loading)

## Credit

This webpage was designed and implemented by Rachel Lewis from the ground up. Special thanks to Kate Lewis for design support and [Avery Wicks](https://github.com/awicks44) for guidance on demystifying the Spotify API.

The [Spotify API documentation](https://developer.spotify.com/documentation/web-api/reference/#/) is extensive and impressive.
