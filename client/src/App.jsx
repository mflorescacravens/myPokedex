import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { fade, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AutorenewIcon from '@material-ui/icons/Autorenew';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'orange',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 300,
      },
    },
    gridListRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  },
}));

export default function App() {
  const classes = useStyles();

  // hooks
  const [generation, setGeneration] = useState();
  const [filter, setFilter] = useState('');
  const [pokemon, setPokemon] = useState('')
  const [pokemonData, setPokemonData] = useState();

  
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => {
      setPokemonData(response.data)
      console.log(response.data)
    })
  }, [])
  
  var mappedPokemon;
  var next;
  
  if (pokemonData) {
    next = () => {
      setPokemonData(pokemonData.next)
    }
    mappedPokemon = (
      <div className={classes.gridListRoot}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            </GridListTile>
            {pokemonData.results.map(pokemon => (
              <GridListTile key={pokemon.url}>
                <GridListTileBar
                  title={pokemon.name}
                  actionIcon={
                    <IconButton aria-label={`info about ${pokemon.name}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
    )
  }
  if (!pokemonData) {
    mappedPokemon = (
      <AutorenewIcon />
    )
  }
  
  // const searchPokemon = () => {
    
  // }


  
  return (
    <div className={classes.root}>
      <div>
        <img className='main' src="https://i.kym-cdn.com/photos/images/original/001/024/523/1c7.jpg" alt="MainLogo"/>
        <Typography variant='h5' align='center'>Welcome to Miguel's Pokedex</Typography>
        <Typography variant='subtitle1' align='center'>Search for a Pokemon by number or name</Typography>
      </div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Miguel's Pokedex
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon  />
            </div>
            <InputBase
              
              placeholder="Pokemon..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      {/* create a map for all pokemon data retrieved with gridlist */}
      {mappedPokemon}
      <BottomNavigation
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Previous 20" icon={<NavigateBeforeIcon />} />
        <BottomNavigationAction label="Next 20" onClick={next} icon={<NavigateNextIcon />} />
      </BottomNavigation>
    </div>
  );
}

// export default App;
