import React, { Component } from "react";
import Sidebar from "../sidebar/sidebar";
import "./adminTemplate.css";

class AdminTemplate extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div id="adminContentContainer" className="container">
          <div className="col-lg-12">
            {this.props.children}
            <div className="table-responsive text-nowrap">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Position</th>
                    <th>Age</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Kate</td>
                    <td>Moss</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Anna</td>
                    <td>Wintour</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>36</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Tom</td>
                    <td>Bond</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Jerry</td>
                    <td>Horwitz</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>41</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Janis</td>
                    <td>Joplin</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>39</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>Gary</td>
                    <td>Winogrand</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>37</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>Angie</td>
                    <td>Smith</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>52</td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>John</td>
                    <td>Mattis</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>28</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>Otto</td>
                    <td>Morris</td>
                    <td>USA / The United Kingdom / China / Russia </td>
                    <td>
                      New York City / Warsaw / Lodz / Amsterdam / London /
                      Chicago
                    </td>
                    <td>
                      Web Designer /UX designer / Ul designer / JavaScript
                      Developer
                    </td>
                    <td>35</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminTemplate;
