## Inspiration

This project was inspired by our love of Game Theory, we can imagine ourselves using this to study it further in our free time and learn more about it using Perplexities API to fact check our understanding of the topic, to revise on the go from my phone and to provide us with citations to further our research

## What it does

Given a note (excluding its title), it returns a fact check paragraph and citations to enhance the users understanding of the topic at hand

## How we built it

Using Firebase we handled authentication of the users and storage of the data, so that each user's data is kept separate and each user can only access the notes they created. Then we used React with Tailwind for the front-end of the website so that it would function smoothly and look elegant.

Then on integrating with the API, upon clicking on the "Fact Check" button, a request is sent to the Perplexity API with the system prompt being "Be Precise and concise. Fact check the content of this message." and the User Prompt being the content of the message excluding the title.

## Challenges we ran into

As this was the first complete project we created using this tech stack, there was a lot of learning to do done, mostly around understanding how react hooks were to be used and how Tailwind functioned.

The AI itself was very easy to get to do what was required.

## Accomplishments that we're proud of

The User interface is very responsive and the App has all the features we planned on as a minimum viable product

## What we learned

We learned how to work with React, Tailwind and Firebase for Authentication, Data Storage and Hosting.

## What's next for Notes

The ability to group notes together would be extremely helpful, whether that's by topic or by creating a tagging system (perhaps using AI to generate the tags) or even both systems together to enhance the searchability of the notes.
