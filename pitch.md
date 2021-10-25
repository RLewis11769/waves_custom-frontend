# 'Waves'

When I think of "waves" I think of the ocean... But yours is a local company and Tulsa doesn't have an ocean. So what could it be? A kayak rental? A waterpark? Something to do with Tulsa's beautiful Arkansas River?

But no.

When I think of waves in Tulsa, there's only one choice.

El Rio Vista Recording Studio. Our very own internationally-recognized, award-winning soundwave production center. The master of music. The superman of sound. The one and only wizard of waves.

## Design

First, El Rio Vista is cool and sophisticated but fun, so the color palette needed to reflect that. I went with a default dark mode using a dark green-blue and a navy blue. Pops of color were added with a bright aqua and white with undertones of aqua. The color scheme, which evokes rivers and waves, but also comfort, mystery, and a subtle playfulness, is meant to capture El Rio Vista's atmosphere.

The mature but bold color scheme is continued in the black-and-white images chosen. Rather than marketing the spaces and studio rooms where the artists will work in actuality, the images chosen will again reflect the personality of El Rio Vista. In fact, the only places that deviate from the four-color palette listed above are the album covers sprinkled throughout. This makes the music the attention-grabbing highlight of the page as it should be.

This clean design continues into the header and footer, tying each page together. The homepage header section boasts a slideshow of minimalist black-and-white photographs from the studio while the subpages keep the same basic design but amp up the sleekness with solid colors. All text is easily-readable and the icons in the footer clearly hint at the links' destinations.

## Structure

In keeping with the minimalist theme, I felt it neccessary to keep the individual sections short and to the point. The "services" section on the homepage for instance, lists only what El Rio Vista offers to clients. No superfluous explanations are necessary. The "results" section details the purpose of the section — the impressive artists who have found El Rio Vista "unique" in the past — and then jumps straight into a slideshow listing them.

The homepage is primarily for marketing purposes. Clients will be hooked by the bold look of the header, then scroll down to a list of services offered. Perhaps rates per hour could be added just below keeping a clean look. Just below, a glimpse at the artists who have called the studio home in the past. They will imagine their own recognizable names joining the list. Nothing more is needed — A music studio website requires a simple, clear homepage to allow potential clients to dream and entice them into looking around further.

Another thing a music studio website requires is music. This can easily be found by clicking over to the "gallery" page. The word "gallery" evokes art. What better way to spotlight the art produced in the studio than music clips? The songs convey a sense of who you are, the diversity of music available, and the strong skills offered.

One last requirement of a professional recording studio is a dedicated contact page. You want to promote yourself with an online portfoio to get people to check you out and open up a line of communication. Whether a prospective client wants a quote, a tour of the studio, or to book a session, the form is open enough to meet all of their needs. A short blurb at the top invites the client to reach out about whatever they want, but also offers a few key suggestions.

## Features

My personal favorite feature of the site is the header slideshow on the homepage. This was created with 3 images as found in the "images/" folder to be used as the background. The layout of each background was set as a class in the "css/styles.css" folder. I then wrote the changeBG() function in the "js/scripts.js" file which adds and removes the specified class associated with each background. The function requires a global variable to indicate that the cycle should start. A setInterval() callback function executes the change every 5 seconds.

While the desktop view is important, statistics show that over half of all website traffic comes from mobile. While the site is fully responsive, it should add features in mobile rather than just convert a design. One of these features is a large menu button for the navigation menu. Already oversized, it becomes larger on hover and swirls into a large X on click as the menu appears. The fun animation and smooth transition evokes the unpredictable nature of a body of water, and El Rio Vista in turn.

As the homepage is the first thing customers see, it should be bold. Because of this, fun features have been added to the homepage header to catch the eye of visitors. The revolving slideshow of images continues to draw attention to the recording studio's name. The name gently bobs up and down as if caught in lapping waves. Moreover, a subtle color change in the words "El Rio Vista" appears to fill the name in with water and drain it out again. All of these effects keep the studio's name centered in a visitor's mind after they leave the site.

Links to other pages are scattered throughout, including everywhere the "El Rio Vista" logo is found. Because of this, the entire design seems interconnected and unified.

An attempt was made at accessability although I don't claim to be an expert. axe DevTools finds only color contrast issues which require manual review, usually due to text against a background image or overlapping text due to the slideshow setup. I found that I was able to navigate around the page with my keyboard only, including navigating and submitting the form.

## Spotify Integration

A key portion of the website design is centered on integration with the Spotify API. While possible to hardcode, the website is updateable with an easily-changed Spotify playlist. I chose the playlist "Waves" and hardcoded the unique ID (36d1de090b6f4e81) into the JavaScript file. The playlist consists of exactly 12 songs, which is the preferred number of songs for design purposes. I will delete the playlist in the future, at which point a new playlist ID will be required for future viewings. After the playlist is deleted, the data of the first 12 songs of any playlist will be included in the site.

The two sections that include data from Spotify are:
- Results - the artist slideshow on the homepage
- Works - the 30-second embedded tracks on the gallery page

## Challenges

Although I could have integrated several other features, I decided to keep it simple. As such, notably, the form on the contacts page is not functional. Utilizing cookies, session or local storage, or a backend storage system would enhance the functionality of the form.

I was unhappy with the "El Rio Vista" water filling effect on the homepage. Because of the mask used, it was extremely difficult to determine which element needed to be specified in order to center the text. I decided to left align the text and call it a design choice, and also left-aligned the recording studio's contact information on the contact page. Additionally, I was unable to locate which element specified the height of the water fill mask effect. This means that despite the speed of the effect, it still takes longer than preferred to fill and unfill.

Additionally, while the colors of "El Rio Vista" and "Recording Studio" are both hardcoded as the same color as in color-pop (#0cd1bd), they appear to be different colors. The text and underline in the navigation menu also appear to be slightly different. Perhaps this is only due to angle or background color, but it could be a result of text mask or the animation effects used.

I planned to use "dots" in the Slick carousel as a way to indicate where in the loop the particular artist was located. This decision was based on the fact that I had only used "arrows" in the past and wanted to experiment. However, I don't actually like the look of 12 dots spread across the bottom and wish I had gone with arrows or found a way to only show a certain number of dots at once. In addition, I have noticed that clicking on a dot disrupts the cycle and freezes on that artist. I don't think I'm using the Slick carousel incorrectly but I'm not sure what causes this.

With more time, I might also have considered updating a few more features. The embedded tracks on the gallery page don't load as quickly as I would like, and a custom loader or some other feature might be fun to design. In addition, because so many calls are made in a short period of time and JavaScript source maps are enabled by default, the console on the gallery page is cluttered with error messages. While I don't believe this causes any problems or has unintended consequences, or even has much to do with my code, it's not ideal.

I don't think I'll be using the jQuery Validation plugin in the future. I could only get it to work by submitting the form, which would trigger whatever event I had planned for that occurrence. Because of this, I did not save/print the data in the inputs/textarea at all because I would need to update it after any fields were changed to satisfy the defined requirements. In addition, when errors occurred and were later corrected, the validation throws up an error message for less than a second just before submitting. Technically I did manage what I had planned, namely a non-working form with working validation, so I'll leave this weirdness as a bug for now and will attempt different ways to validate.

Finally, I expected the Spotify API to be much more difficult than it was in actuality. I originally did not think I could use the relatively-simple "client credentials" authorization due to a mistaken understanding of tokens. When I found a good tutorial, it involved public and private methods. At this time, I still don't consider closures to be one of my strengths in JavaScript, but working out what was happening in the code did expand my knowledge by a fair amount.

## Conclusion

I found through this process that I might be decent at clean, minimalist designs and fun animations. Certainly UI/UX design is not a particular passion or skill of mine, but I like how the design turned out. I also enjoyed researching the various animation possibilities. While modifying the details I found to my specifications was very challenging, I appreciated the journey.

I also appreciated the opportunity to learn more about closures and methods. While I found part of the code online, I had to heavily modify it in order to fit my purposes. Because of this, I developed a strong understanding of exactly what is going on in the code. I plan to experiment more with the Spotify API and other APIs that require authorization in the future.

As a whole, I consider this project to be a success. I learned a lot and accomplished a great deal even though I didn't put in maximum effort. Of the 11 days allotted for this project, I added code to GitHub 6 of those days, and probably designed and planned another day or two. Due to this schedule, this project was very relaxed and enjoyable for me despite the hard work I put in.
