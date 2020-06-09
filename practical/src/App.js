import React, { useEffect } from 'react';
import Component from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Board Game Score Keeper
        </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );

}

class BoardgameList extends React.Component {

  state = {
    games: null
  }

  componentDidMount(){
    axios.get('https://us-central1-practical-4eb41.cloudfunctions.net/getGames')
    .then(res => {
      this.setState({
        games: res.data
      })
    })
  }


  render() {
    
    //const classes = useStyles();
    let gamesMarkup = this.state.games ? (
      this.state.games.map(game =><p>{game.title}</p>)
    ) : <p>Loading...</p>

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {gamesMarkup}
        </Grid>
  
      </Grid>
    );
  }
}

function App() {

  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <BoardgameList />

    </div>
  );
}

export default App;
