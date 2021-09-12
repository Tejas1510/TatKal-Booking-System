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
        url: "https://cdn.dribbble.com/users/121630/screenshots/13898887/media/7b0226c1cb9e4c394536fd3685054689.png?compress=1&resize=400x300"
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
        url: "http://blog.clickdimensions.com/wp-content/uploads/2017/07/BlogFeatureImage-Ways-to-use-SMS-with-Customers-v1.png"
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
        url: "data:image/jpeg;base64,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"
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
        url: "https://st4.depositphotos.com/25453930/40688/v/600/depositphotos_406885434-stock-illustration-step-authentication-illustration-web-page.jpg"
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
        url: "https://lh3.googleusercontent.com/proxy/d2VX0X7SAXtzwiaI2PUUOD--33cvlfnRXCeEoOv_yxjDRPVkHbgEf4jeFKYa24kaohfnGAxXdFbSoDxoeRk2CYaImK6vW1f36f56PjSm5xguXKfG3Dc"
      }
    }
  }];

 
  return (
 <div>
    <div style={{
      backgroundImage: 'url("https://i.ytimg.com/vi/tBZRI-u1Q94/maxresdefault.jpg")',
       height:"600px" ,backgroundRepeat: "no-repeat", backgroundSize: "cover"
    }} class="container-fluid col-sm-12 col-12 responsive">

    <div class="col-6">
           <h1 class="ml-4 p-5 text-dark" style={{fontSize:"10vh"}}>Indian Railways Tatkal Reservation</h1>
    </div>
    </div>

    <div class="container my-3">
     
    <h1 class="text-center text-primary" >About </h1>
    <h5 class="text-center p-2">This initiative by Indian Railways Nagpur Region is taken to remove the hectic and time-consuming process of Offline Tatkal Reservation System. This system would be a boon to present system, to know Why, read below section.</h5>
    <div class="row">
      <div class="col-12 col-sm-6 bg-light shadow p-4">
      <div class="row">
        <div class="col-12 col-sm-6">
        <h2 class="text-primary">No more waiting in Long Queues</h2>
        People used to wait in Lonq queues for their turn and a lot of them would need to return without any tickets. Now, to curb this we have a Token Giving System wherin only those users having the token could come at Railway Ticket Counter.
        </div>
        <div class="col-12 col-sm-6">
        <img src="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2018/10/queue-1540400008.jpg" width="100%"></img>
          </div>
      </div>
        

      </div>
      <div class="col-12 col-sm-6 bg-light shadow p-4">
      <div class="row">
        <div class="col-12 col-sm-6">
        <h2 class="text-primary">No More Tedious Task of Form Filling</h2>
        People don't tend to fill lengthy forms at railway station among so much crowd and had to haste for receiving tatkal ticket. Now using this platform people could fill their forms at their own comfort and could take their own time.
        </div>
        <div class="col-12 col-sm-6">
        <img src="https://www.irctcstationcode.com/wp-content/uploads/2014/12/Man-Validating-the-Forms.jpg" width="100%"></img>
          </div>
      </div>
      </div>
    </div>

    <div class="row my-4">
      <div class="col-12 col-sm-6 bg-light shadow p-3">
      <div class="row">
        <div class="col-12 col-sm-6">
        <h2 class="text-primary">Probablity of Getting tickets would be High!!</h2>
        People used to wait in Long queues from 4 AM in the morning and had to return as very few people could get Tatkal Tickets. <br/>
        But, now only few people would be able to come at Railway Counter for booking tickets and hence  your probablity of getting tickets would be More!!
        </div>
        <div class="col-12 col-sm-6">
        <img src="https://blog.railyatri.in/wp-content/uploads/2019/06/Trouble-Free-Booking.png" width="100%"></img>
          </div>
      </div>
        

      </div>
      <div class="col-12 col-sm-6 bg-light shadow p-3">
      <div class="row">
        <div class="col-12 col-sm-6">
        <h2 class="text-primary">Lot of Paperwork Reduced</h2>
        As responsibe citizens, our responsibity is to save Paper and going with these morals we are going with initiative of E-forms which would drastically reduce tonns of paper. Also paperwork for audit purpose would be eliminated as digital signatures would be taken from passengers.
        </div>
        <div class="col-12 col-sm-6">
        <img src="https://media.istockphoto.com/vectors/green-ecology-concept-paper-cut-style-vector-id1178245155?k=20&m=1178245155&s=612x612&w=0&h=6GkTK2kaF3WxdZXFoaTkzrJxh3fTGNsnKghx9vCfSjI=" width="100%"></img>
          </div>
      </div>
      </div>
    </div>
    <hr/> 
    <div class="col-12 col-sm-8 my-3" style={{ margin: "auto" }}>

        <h1 class="text-center text-primary" > How to Proceed?</h1>
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
  
  <div class="container col-9">
    <h1 class="text-center text-primary my-2" >Recent Updates</h1>
    <Carousel 
     NextIcon={<NavigateNextIcon/>}
        PrevIcon={<ArrowBackIosIcon/>}
        >
       <div class="row my-3">
              <div class="col-12 col-sm-4">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media}
                    image="https://images.hindustantimes.com/img/2021/09/09/550x309/044cbafe-1174-11ec-8f84-d3748427d977_1631205954037.jpg"
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
              <div class="col-12 col-sm-4">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media}
                    image="https://static.toiimg.com/thumb/msid-85817568,imgsize-96760,width-400,resizemode-4/85817568.jpg"
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
              <div class="col-12 col-sm-4">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media}
                    image="https://static.india.com/wp-content/uploads/2021/05/special-trains-list.jpg"
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
   <div class="row my-3">
   <div class="col-12 col-sm-4">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media}
                    image="https://images.hindustantimes.com/img/2021/09/09/550x309/044cbafe-1174-11ec-8f84-d3748427d977_1631205954037.jpg"
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
              <div class="col-12 col-sm-4">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media}
                    image="https://static.toiimg.com/thumb/msid-85817568,imgsize-96760,width-400,resizemode-4/85817568.jpg"
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
              <div class="col-12 col-sm-4">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media}
                    image="https://static.india.com/wp-content/uploads/2021/05/special-trains-list.jpg"
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
