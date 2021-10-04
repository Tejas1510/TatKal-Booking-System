import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Chrono } from "react-chrono";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './Home.css';
import paperWorkImg from'../../images/paperwork.jpg';
import probabilityTicketImg from'../../images/probabilityTicket.png';
import tediousFormImg from '../../images/tediousForm.jpg';
import longQueuesImg from '../../images/longQueues.jpg';
import mainHeaderImg from '../../images/mainHeader.jpg';
import specialTrainListImg from '../../images/specialTrainList.webp';
import solarPowerImg from '../../images/solarPower.webp';
import highSpeedCorridorImg from '../../images/highSpeedCorridor.jpg';
import fillTRFormImg from '../../images/fillTRForm.webp';
import visitRailwayStationImg from '../../images/visitRailwayStation.jpg';
import verificationOperatorCounterImg from '../../images/verificationOperatorCounter.jpg';
import receiveTokenImg from '../../images/receiveToken.png';
import finalBookingImg from '../../images/finalBooking.webp';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Home() {
  const classes = useStyles();

  const items = [{
    title: "STEP 1",
    cardTitle: "Fill Tatkal Request Form",
    cardDetailedText: "Navigate to Tatkal Request Form button in Navbar and fill in the request form with user details, berth and class prefernces, passenger details and give your digital signature. After submitting, you will receive a confirmation message on registered mobile number.",
    media: {
      type: "IMAGE",
      source: {
        url: `${fillTRFormImg}`
      },
    }
  },
  {
    title: "STEP 2",
    cardTitle: "Receive Token Number",
    cardDetailedText: "Selected Users will be receiving TOKEN NUMBER on their registered mobile number. Save this message as you need to show at Railway Station. Receiving Token Number confirms that you can visit Railway Station. * Users who don't receive such SMS are not allowed to visit to Station for Tatkal Booking. ",
    media: {
      type: "IMAGE",
      source: {
        url: `${receiveTokenImg}`
      }
    }
  },
  {
    title: "STEP 3",
    cardTitle: "Visit Railway Station",
    cardDetailedText: "Passengers need to reach Railway Station at 9:30 am for final booking. ",
    media: {
      type: "IMAGE",
      source: {
        url: `${visitRailwayStationImg}`
      }
    }
  },
  {
    title: "STEP 4",
    cardTitle: "Verification at Operator 1 Counter",
    cardDetailedText: "Passengers need to visit Counter 1 where they need to show their Token Number to operator. Operator would be sending an OTP which would be required for authentication. Once done user can proceed to Operator 2 counter for final booking and Payment. ",
    media: {
      type: "IMAGE",
      source: {
        url: `${verificationOperatorCounterImg}`
      }
    }
  },
  {
    title: "STEP 5",
    cardTitle: "Payment and Final Booking at Operator 2 Counter",
    cardDetailedText: "This would be the final step wherein passenger would need to visit Operator 2 counter for Payment and Final Booking. ",
    media: {
      type: "IMAGE",
      source: {
        url: `${finalBookingImg}`
      }
    }
  }];


  return (
    <div>
      <div style={{
        backgroundImage: `url("${mainHeaderImg}")`,
        height: "600px", backgroundRepeat: "no-repeat", backgroundSize: "cover"
      }} className="container-fluid col-sm-12 col-12 responsive">

        <div className="col-md-7 col-12" style={{backgroundColor: "rgba(255, 255, 255, 0.6)"}}>
          <h1 className="ml-4 p-5 text-dark display-1">Indian Railways Tatkal Reservation</h1>
        </div>
      </div>

      <div className="container my-3">

        <h1 className="text-center text-primary" >About </h1>
        <h5 className="text-center p-2">This initiative by Indian Railways Nagpur Region is taken to remove the hectic and time-consuming process of Offline Tatkal Reservation System. This system would be a boon to present system, to know Why, read below section.</h5>
        <div className="row">
          <div className="col-12 col-sm-6 bg-light shadow p-4">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h2 className="text-primary">No more waiting in Long Queues</h2>
                People used to wait in Lonq queues for their turn and a lot of them would need to return without any tickets. Now, to curb this we have a Token Giving System wherin only those users having the token could come at Railway Ticket Counter.
              </div>
              <div className="col-12 col-sm-6">
                <img src={longQueuesImg} width="100%"></img>
              </div>
            </div>


          </div>
          <div className="col-12 col-sm-6 bg-light shadow p-4">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h2 className="text-primary">No More Tedious Task of Form Filling</h2>
                People don't tend to fill lengthy forms at railway station among so much crowd and had to haste for receiving tatkal ticket. Now using this platform people could fill their forms at their own comfort and could take their own time.
              </div>
              <div className="col-12 col-sm-6">
                <img src={tediousFormImg} width="100%"></img>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-12 col-sm-6 bg-light shadow p-3">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h2 className="text-primary">Probablity of Getting tickets would be High!!</h2>
                People used to wait in Long queues from 4 AM in the morning and had to return as very few people could get Tatkal Tickets. <br />
                But, now only few people would be able to come at Railway Counter for booking tickets and hence  your probablity of getting tickets would be More!!
              </div>
              <div className="col-12 col-sm-6">
                <img src={probabilityTicketImg} width="100%"></img>
              </div>
            </div>


          </div>
          <div className="col-12 col-sm-6 bg-light shadow p-3">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h2 className="text-primary">Lot of Paperwork Reduced</h2>
                As responsibe citizens, our responsibity is to save Paper and going with these morals we are going with initiative of E-forms which would drastically reduce tonns of paper. Also paperwork for audit purpose would be eliminated as digital signatures would be taken from passengers.
              </div>
              <div className="col-12 col-sm-6">
                <img src={paperWorkImg} width="100%"></img>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-12 col-sm-8 my-3" style={{ margin: "auto" }}>

          <h1 className="text-center text-primary" > How to Proceed?</h1>
          < Chrono
            items={items}
            mode="VERTICAL_ALTERNATING"
            theme={{
              primary: "red",
              secondary: "yellow",
              cardBgColor: "white",
              cardForeColor: "black",
              titleColor: "blue"
            }}
            cardWidth="300"
            cardHeight="200"
          />

        </div>

        <div className="container col-9">
          <h1 className="text-center text-primary my-2" >Recent Updates</h1>
          <Carousel
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<ArrowBackIosIcon />}
          >
            <div className="row my-3">
              <div className="col-12 col-sm-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                      image={highSpeedCorridorImg}
                      title="Train"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        New high-speed train corridors planned to connect Mumbai with Pune, Nagpur
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        A semi high-speed train corridor between Mumbai and Pune being planned to reduce travel time to ...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href="https://www.hindustantimes.com/cities/mumbai-news"> Read More</a>
                    </Button>

                  </CardActions>
                </Card>

              </div>
              <div className="col-12 col-sm-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                      image={solarPowerImg}
                      title="Train"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Railways shifting to solar power could cut emissions
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Nagpur: Direct supply of solar energy to Indian Railway lines, without the need to connect through the grid, would save...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href="https://timesofindia.indiatimes.com/city/nagpur/railways-shifting-to-solar-power-could-cut-emissions-study/articleshow/85817569.cms"> Read More</a>
                    </Button>

                  </CardActions>
                </Card>

              </div>
              <div className="col-12 col-sm-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                      image={specialTrainListImg}
                      title="Train"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Indian Railways All Set to Run Special Festival Trains From Sept 13
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        As per the latest announcement, the Indian Railways will operate Durg-Ajmer-Durg and Durg-Jammu Tawi weekly superfast special trains to cater to the demand...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href="https://www.india.com/business/irctc-latest-news-today-11-september-2021-indian-railways-all-set-to-run-special-festival-trains-from-sept-13-durg-ajmer-durg-and-durg-jammu-tawi-superfast-special-trains-4950444/"> Read More</a>
                    </Button>

                  </CardActions>
                </Card>

              </div>


            </div>
            <div className="row my-3">
              <div className="col-12 col-sm-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                      image={highSpeedCorridorImg}
                      title="Train"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        New high-speed train corridors planned to connect Mumbai with Pune, Nagpur
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        A semi high-speed train corridor between Mumbai and Pune being planned to reduce travel time to ...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href="https://www.hindustantimes.com/cities/mumbai-news"> Read More</a>
                    </Button>

                  </CardActions>
                </Card>

              </div>
              <div className="col-12 col-sm-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                      image={solarPowerImg}
                      title="Train"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Railways shifting to solar power could cut emissions
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Nagpur: Direct supply of solar energy to Indian Railway lines, without the need to connect through the grid, would save...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href="https://timesofindia.indiatimes.com/city/nagpur/railways-shifting-to-solar-power-could-cut-emissions-study/articleshow/85817569.cms"> Read More</a>
                    </Button>

                  </CardActions>
                </Card>

              </div>
              <div className="col-12 col-sm-4">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}
                      image={specialTrainListImg}
                      title="Train"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Indian Railways All Set to Run Special Festival Trains From Sept 13
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        As per the latest announcement, the Indian Railways will operate Durg-Ajmer-Durg and Durg-Jammu Tawi weekly superfast special trains to cater to the demand...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href="https://www.india.com/business/irctc-latest-news-today-11-september-2021-indian-railways-all-set-to-run-special-festival-trains-from-sept-13-durg-ajmer-durg-and-durg-jammu-tawi-superfast-special-trains-4950444/"> Read More</a>
                    </Button>

                  </CardActions>
                </Card>

              </div>



            </div>


          </Carousel>

        </div>


      </div>

    </div>
  )
}

export default Home
