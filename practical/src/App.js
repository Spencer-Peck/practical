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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


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

function Game({ game }) {
  return (
    <TableRow >
      <TableCell component="th" scope="row">
        {game.title}
      </TableCell>
      <TableCell align="right">
        <img src={game.ImageUrl} alt="Italian Trulli" width="100" height="100"></img>
      </TableCell>
    </TableRow>
  );
}



class BoardgameList extends React.Component {

  state = {
    games: null
  }

  componentDidMount() {
    axios.get('https://us-central1-practical-4eb41.cloudfunctions.net/getGames')
      .then(res => {
        this.setState({
          games: res.data
        })
        console.log(res.data);
      })
  }


  render() {

    //const classes = useStyles();
    let gamesMarkup = this.state.games ? (
      this.state.games.map((game) => <Game game={game} />)
    ) : <p>Loading...</p>

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gamesMarkup}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </Grid>
    );
  }
}

function AddNewGameButton({ setOpen }) {

  return (
    <Button variant="contained" color="primary" onClick={() => { setOpen() }}>
      Add New Game
    </Button>
  );
}

function AddGameForm({ open, handleClose, postGames }) {



  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new game
          </DialogContentText>
          <TextField
            autoFocus
            ref="title"
            margin="dense"
            id="name"
            label="Game Title"
            fullWidth
          />
          <TextField
            ref="url"
            margin="dense"
            id="name"
            label="Image Url"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose, postGames()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}

function App() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function postGames(title, url) {
    axios.post('https://us-central1-practical-4eb41.cloudfunctions.net/createGame', {
      title: title,
      ImageUrl: url
    })
      .then(function (response) {
        console.log(response);
      })
  }

  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <BoardgameList />
      <AddNewGameButton setOpen={handleClickOpen} spacing={4} />
      <AddGameForm open={open} handleClose={handleClose} postGames={postGames} />

    </div>
  );
}

export default App;
