import React from 'react';
import { Link } from 'react-router-dom';
import './LetterPage.css';

function LetterPage() {
  return (
    <div className="letter-container">
      <div className="letter-content">
        <span className="letter-heart">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 42s-13.5-8.5-13.5-18.5S16.5 7 24 15.5 37.5 7 37.5 23.5 24 42 24 42z" fill="#ffb6b9" stroke="#a18cd1" strokeWidth="2"/>
          </svg>
        </span>
        <h1>A Letter for You</h1>
        <p>
        I'm so very glad that I met you, that we opened up to each other, that I took a liking to you and here we are. We spent the whole college together, making each other feel at home. It's so amazing how every single decision led me towards you - each and everything feels like a setup, a setup to experience the love each of us has seen glimpses of but never truly experienced.
Thank you for making my college such amazing memories. We've come so far together, and now as this chapter closes and a new one begins, I can't help but think about how perfectly everything fell into place.
The letter I've been asking you for so long, was so amazingly written - my heart just melted, the way you wrote that letter... it reminded me again why I fell so deeply in love with you.
I have already said a lot in the video, but here I just want you to know how proud I am of you. You worked so hard and eventually achieved it. Your placement is so special to me, and I want to show you that. This new chapter in your life - it's everything you deserve and more.
I know this website is so basic, but I poured my heart into it. I know you will always remember this website, I know you will value it, even if it's just a static HTML page. That's why you are so special to me - you see the love behind the simplest gestures.
Please accept my love in the form of this website and gift, and I hope you like it or even love it. You've made college beautiful, you've made every moment count, and now as we step into this new phase of our lives, I want you to know that you mean everything to me.
College is ending, but our story is just beginning. From spending every day together in college to now watching you achieve your dreams - it's been the most beautiful journey.
I love you the most, jaane
        </p>
        <p>
          With all my love,<br/>
          Poopie
        </p>
        <Link to="/reveal" className="cta-button">
          See your gift
        </Link>
      </div>
    </div>
  );
}

export default LetterPage; 