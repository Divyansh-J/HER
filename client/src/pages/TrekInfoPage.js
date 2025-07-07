import React, { useEffect } from 'react';
import './TrekInfoPage.css';

const TrekInfoPage = () => {
  useEffect(() => {
    console.log('[DEBUG] TrekInfoPage mounted.');
    // Set the lush valley color palette for this page
    const root = document.documentElement;
    root.style.setProperty('--main-bg', 'var(--main-bg)');
    root.style.setProperty('--text-color', 'var(--text-color)');
    root.style.setProperty('--accent-color', 'var(--accent-color)');
    root.style.setProperty('--accent-text', 'var(--accent-text)');
    root.style.setProperty('--surface-color', 'var(--surface-color)');
    root.style.setProperty('--border-color', 'var(--border-color)');

    // Cleanup function to reset colors when component unmounts
    return () => {
      console.log('[DEBUG] TrekInfoPage unmounted. Resetting color palette.');
      root.style.setProperty('--main-bg', '#FAF9F6');
      root.style.setProperty('--text-color', '#2C3E50');
      root.style.setProperty('--accent-color', '#7FB069');
      root.style.setProperty('--accent-text', '#FAF9F6');
      root.style.setProperty('--surface-color', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--border-color', 'rgba(127, 176, 105, 0.2)');
    };
  }, []);

  return (
    <div className="trek-info-container">
      <h1>Your Adventure Awaits!</h1>
      <p className="intro-paragraph">
        This trek is a celebration of your incredible achievement—your placement! As you begin this exciting new chapter, may this adventure be a reward for your hard work and a reminder of all that you can accomplish.
      </p>

      <section>
        <h2>Trek Fact Sheet</h2>
        <table className="fact-sheet">
          <tbody>
            <tr><th>Difficulty</th><td>Difficult</td></tr>
            <tr><th>Duration</th><td>8-9 Days (including travel)</td></tr>
            <tr><th>Total Distance</th><td>Approx. 50-62 km</td></tr>
            <tr><th>Highest Altitude</th><td>16,105 ft / 4,915 m</td></tr>
            <tr><th>Best Season</th><td>Mid-July to Mid-September</td></tr>
            <tr><th>Region</th><td>Himachal Pradesh, India</td></tr>
            <tr><th>Start Point</th><td>Kafnu, Kinnaur Valley</td></tr>
            <tr><th>End Point</th><td>Mudh, Pin Valley (Spiti)</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Trek Highlights</h2>
        <ul className="highlights-list">
          <li>Experience a dramatic landscape change from lush green valleys to an arid cold desert.</li>
          <li>Camp at stunningly beautiful and remote campsites.</li>
          <li>Feel the achievement of crossing a challenging high-altitude pass.</li>
          <li>Immerse yourself in the unique culture of the villages of Kafnu and Mudh.</li>
        </ul>
      </section>

      <section>
        <h2>Preparation is Key</h2>
        <p>A "Difficult" rated trek is a rewarding challenge! This guide is to ensure you feel confident and ready for the expedition.</p>
        <ul className="prep-list">
          <li>
            <strong>Fitness Benchmark:</strong> It is recommended that you can comfortably run 5 km in 30 minutes or walk 10 km on varied terrain before undertaking this trek. This is an actionable goal to work towards.
          </li>
          <li>
            <strong>Essential Gear:</strong> A proper layering system (base layer, fleece, outer shell) is mandatory. High-ankle, waterproof trekking shoes are required and must be broken in beforehand to prevent blisters. A 50-60 liter rucksack and trekking poles are also necessary.
          </li>
          <li>
            <strong>Health & Logistics:</strong> There will be no mobile network from Kafnu until you reach Kaza. ATMs are also scarce after major towns, so carrying sufficient cash for personal expenses is advised.
          </li>
        </ul>
      </section>

      <section>
        <h2>What's Included</h2>
        <p>This is a fully-sponsored gift. All of the following is covered:</p>
        <ul className="prep-list">
          <li>All necessary permits for the trek.</li>
          <li>An experienced guide and support staff.</li>
          <li>All food during the trek and camping equipment.</li>
        </ul>
      </section>
    </div>
  );
};

export default TrekInfoPage;