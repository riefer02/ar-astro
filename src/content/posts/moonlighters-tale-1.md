---
title: "Moonlighter Tales: Building Websites, Monitoring Systems, and a Custom RAG Application"
pubDate: 2024-09-22
description: "An overview of recent moonlighting projects including building a restaurant website with Astro, a custom monitoring solution using Deno, and an agent RAG application to assist with revising a 90,000-word book."
author: "Andrew Riefenstahl"
image:
  url: "../../assets/images/moonlighter-tales.jpg"
  alt: "Image of a laptop and code editor representing moonlighting web development projects."
tags:
  [
    "moonlighting",
    "Astro",
    "WordPress",
    "LangChain",
    "Deno",
    "web development",
    "RAG application",
    "monitoring systems",
    "freelance web development",
  ]
---

Let’s talk shop this time because most of the people visiting this site are probably recruiters. When they stumble upon this blog, they’re likely thinking, “I think we’ve found a winner!” (laughs).

So, what have I been up to? Well, I’ve had a few successful moonlighting projects recently.

### TolbertsRestaurant.com

First up is the new website for [**TolbertsRestaurant.com**](https://tolbertsrestaurant.com), which I built alongside Riley Sklar. When the opportunity arose to create their new site, we presented them with a competitive offer. Not only did they save money, but they also got a superior product.

A few years ago, I built a standalone Next.js application as a music calendar for their events at **tolbertsmusic.com**. At the time, I was using the Next.js **Page Router**, which was an excellent real-world opportunity to grow my skills. While **Page Router** can be a bit tricky (just kidding, it’s not that bad), the real issue was deciding on a backend. They had a legacy WordPress site, so I set up a new WordPress instance as a dedicated content management system (CMS), with Next.js handling the front end. 

Lately, I’ve been using the **App Router** at work, which has been a significant improvement in terms of organization and flexibility.

Fast forward to today, they needed a new front end for their restaurant website, and we chose to use **Astro**. We actually started with my personal website template since it was bare-bones but had enriched SEO and excellent speed, essentially being HTML. From there, we started building.

We didn’t have a formal design team, but Riley, with his design background, and I, with my development experience, intuitively combined our skills. Riley focused more on the front end, while I handled the backend. It was a lot of fun, and we learned a ton along the way. Plus, getting paid is always a nice bonus!

One of the more significant learning moments came when I accidentally broke their email server. I switched the domain to use new **name records** in **Netlify**, where we hosted the site. A few days later, I got an email saying they hadn’t received any emails. It turned out that switching the domain broke their email setup because I didn’t configure the necessary DNS records like **MX** records and security protocols like **DMARC** properly. After fixing that, I realized how critical these email security measures are and even set up my own private email server for future projects. That was a real growth moment for me—nobody died, and we all learned something!

### Improved WordPress Development Flow

On the backend, there were some major improvements to our workflow. I had always struggled with how to version my WordPress themes. I used to work at an agency that had a homegrown system for this, but eventually, I found the package **WP-ENV**, which allowed me to spin up a WordPress instance in **Docker** and map it to my content folder. This meant I could quickly spin up a local WordPress development environment, get to work writing custom code, and then push changes to the remote server.

The best part? All of the changes were versioned in a specific **GitHub repository**, ensuring that everything was cleanly tracked. This workflow saved a ton of time and made deployments much smoother.

We hosted the site on **Amazon Lightsail**, primarily because it’s cost-effective and offers granular control. However, I’ve had my share of frustrations with AWS, especially when it comes to their development support, but that’s a topic for another day. The key takeaway is that I now have a rock-solid, low-cost workflow for setting up custom backends for freelance projects.

### Custom Monitoring Solution with Deno

For some of my freelance work, I realized I needed a custom monitoring solution. For example, AWS once dropped one of my services without warning, and I had to scramble to reboot it. They gave me no documentation, and the email they sent was super vague. After this experience, I knew I had to build something more reliable.

That’s when I created a script in **Deno** that runs on **Deno Deploy**. Every five minutes, the script pings the backend services for my clients, and if any of them fail to return a 200 status, I receive an immediate email notification. This monitoring solution is simple but effective, and it gives me peace of mind. Plus, I love Deno’s minimal setup and versatility.

### Agent RAG Application for My Book

Lastly, I want to talk about the **Agent RAG** (retrieval-augmented generation) application I’ve been working on. I wrote a book back in 2016-2017, totaling about 90,000 words, and editing has been a slow process. To help streamline this, I built a custom chatbot that allows me to ask questions about my book without needing to re-read everything.

Using **LangChain**, I set up a large language model that can access all my markdown files and notes. It creates embeddings of the content, allowing me to run natural language queries. This means I can get answers about specific sections or themes in the book, which has made revisions and edits much faster.

I also finally got around to learning **Streamlit** after seeing it mentioned in several tutorials. After an 8-9 hour hackathon, I had a fully functional chat application running in my local browser. This app can access my book, answer questions, and help with the editing process. 

The next step is to enhance the system by converting my LangChain setup to use **LangGraph**, which will give the chatbot more flexibility. Right now, every query results in a vector similarity search, but with LangGraph, the bot will be able to choose whether to respond normally or perform a retrieval, depending on the situation.

While the book assistant won’t be public since it’s an internal tool, I’m considering putting it on **GitHub** as an example for others.

So these are just a few of the amazing projects I've worked on over the past couple of months. They’ve brought me a lot of joy, and I've learned so much along the way. Each of them has taught me valuable lessons that I’ll continue to apply in future projects.

All the best,  
Much ❤️  
**Andrew**
