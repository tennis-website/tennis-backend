async function generateEmailBodyHTML(date,time,instructors,location,googleMapsUrl,streetAddress,cityStateZipaddress) {
try{
    return (`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Online HTML Editor</title>
        <style>
            @media only screen and (max-width: 767px) {
                body {
                    font-size: 80%;
                }
                .Title {
                    font-size: 250%;
                }
                .TopDate {
                    font-size: 200%;
                }
                .Time {
                    font-size: 200%;
                }
                .background {
                    font-size: 125%;
                }
                .InTitle {
                    font-size: 90%;
                }
                .name {
                    font-size: 70%;
                }
                .address {
                    font-size: 60%;
                }
                .addressbackground {
                    font-size: 125%;
                }
                .green-button-left,
                .green-button-right {
                    height: 50px;
                    font-size: 120%;
                    border-radius: 25px;
                }
                .closing {
                    font-size: 100%;
                }
            }
            @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap');
            .Title{
                text-align: center;
                font-weight: 700;
                color: black;
                font-size: 350%;
                font-family: Raleway, sans-serif;
            }
            .container {
                border-width: 2px;
                border-color: black;
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px; 
                box-sizing: border-box; 
            }
            body {
                font-family: Raleway, sans-serif;
            }
            .TopDate{
                text-align: center;
                font-weight: 700;
                font-size: 275%;
                color: #233831;
                margin-bottom: -1%;
            }
            .Time{
                margin-top: -1%;
                color: #233831;
                text-align: center;
                font-weight: 700;
                font-size: 275%;  
            }
            .hr-style {
                width: 85%;
                border: 0;
                height: 2px;
                background: black;
                background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
            }
            .background{
                border-radius: 20px;
                margin-left:20%;
                margin-right:20%;
                width: 60%;
                background-color: #F1F1F1;
                text-align: center;
                font-size: 175%;
                padding-top: 5%;
                padding-bottom: 5%;
            }
            .InTitle{
                margin-top: 0%;
                color: black;
                font-size: 100%;
                margin-bottom: 0%;
                font-weight: 700;
                font-family: Raleway, sans-serif;
            }
            .instructors{
                display: flex;
                color: black;
                flex-direction: row; 
            }
            .name{
                margin-left: auto;
                margin-right: auto;
                font-size: 80%;
                font-weight: 400;
                font-family: Raleway, sans-serif;
                margin-bottom: 0%;
            }
            .address{
                margin-top: 0%;
                margin-bottom: 0%;
                font-size: 70%;
                font-weight: 500;
                letter-spacing: 2px;
                color: black;
                text-decoration: none;
                font-family: Raleway, sans-serif;
            }
            .addressbackground{
                margin-top:5%;
                border-radius: 20px;
                margin-left:20%;
                margin-right:20%;
                width: 60%;
                background-color: #F1F1F1;
                text-align: center;
                font-size: 175%;
                padding-top: 5%;
                padding-bottom: 5%;
            }
            .green-button-left{
                height: 60px;
                background-color: #233831;
                color: #FFFFFF;
                font-size: 150%;
                font-weight: 700;
                border-radius: 35px;
                border-width: 0px;
                width: 35%;
                margin-top: 5%;
                margin-left: 14%;
                margin-right: 2%;
            }
            .green-button-right{
                height: 60px;
                background-color: #233831;
                color: #FFFFFF;
                font-size: 150%;
                font-weight: 700;
                border-radius: 35px;
                border-width: 0px;
                width: 35%;
                margin-top: 5%;
                margin-left: auto;
                margin-right: auto;
            }
            .green-button-right:hover{
                background-color: #121e1a;
                color: #a9a8a8;
            }
            .green-button-left:hover{
                background-color: #121e1a;
                color: #a9a8a8;
            }
            .closing{
                color: black;
                text-align: center;
                font-size: 100%;
            }
            .email:link {
                color: #0664F0;
            }
            
            .email:visited {
                color: #0664F0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="Title">LESSON REMINDER</h1>
            <h2 class ="TopDate">${date}</h2>
            <hr class="hr-style">
            <h2 class ="Time">${time}</h2>
            <div class = "background">
                <h4 class = "InTitle">INSTRUCTORS:</h4>
                <div class = "instructors">
                ${instructors.map(instructor => `<p class="name">${instructor}</p>`).join('')}
            </div>
            </div>
            <div class = "addressbackground">
                    <p class = "address">${location}</p>
                    <a class = "address" href = "${googleMapsUrl}" target="_blank">${streetAddress} <br>
                    ${cityStateZipaddress}</a>
            </div>
            <div>
                <a href="http://localhost:3000/join-lesson" target="_blank">
                    <button class = "green-button-left">EDIT SIGN UP</button>
                </a>
                <a href="http://localhost:3000/home" target="_blank"> 
                <button class = "green-button-right">VISIT WEBSITE</button>
                </a>
            </div>
            <div>
                <p class = "closing">
                    We look forward to seeing you! If you have any <br>
                    questions please email us at  <br>
                    <a class = "email" href = "mailto:thewestlaketennisacademy@gmail.com">thewestlaketennisacademy@gmail.com</a> or call us  <br>
                    at (420) 696-9696
                </p>
            </div>
        </div>
    </body>
    </html>`);
    }
    catch(err){
        console.log("error html" + err.message )
        return "ERROR"
    }
}

module.exports.generateEmailBodyHTML = generateEmailBodyHTML