import React from 'react';

import './App.css';

function App() {
  return (
    <div className="App">
       <div id="app" class="container-fluid">
      <div class="row align-items-center no-gutters">
        <div class="offset-md-1 col-md-6 col-12 p-5 p-md-0">
          <h3 class="d-flex pb-3">
            <span class="pt-1">ENDO The Digital Marketing Partner</span>
            <img
              class="float-right endo-icon"
              src="ENDO.svg"
              alt="endr"
            />
          </h3>
          <p>
            Builder and Constant Contact have many point solutions for customers
            to market themselves. How can we help customer choose the right
            solutions to help market themselves effectively given their
            industry?
          </p>
          <p>
            This AI partner will help onboard and guide the customer to help
            discover and market their small business in effective ways such as
            product and syndication recommendations based on analyzing their
            site and email campaign metrics and using their business verticals.
          </p>
        </div>
        <div class="col-12 col-md-auto ml-md-auto px-5">
          <img class="endo pr-2" src="FPO-ENDO.png" alt="endo" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
