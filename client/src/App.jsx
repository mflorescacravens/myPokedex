import React, {useState, useEffect} from 'react';
import Link from 'react-router';
import './App.css';
import axios from 'axios';
import { fade, makeStyles, createMuiTheme } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  appBar: {
    
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
    pokeShow: {
      marginTop: 10,
    },
  },
}));

export default function App() {
  const classes = useStyles();
  // hooks
  const [update, setUpdate] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState()
  const [pokemonData, setPokemonData] = useState();

  var next;
  var previous;
  var mappedPokemon;
  var indPokemonShow;
  var secondType = '';
  var previousButton
  // var imgArr = [searchedPokemon.sprites.front_default, searchedPokemon.sprites.back_default, searchedPokemon.sprites.shiny_front, searchedPokemon.sprites.shiny_back];

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((response) => {
      setPokemonData(response.data)
      // console.log('this is pokemon data', response.data)
    })
  }, [])


  const updateSearch = (e) => {
    setUpdate(e.target.value.toLowerCase())
  }
  
  const search = (e) => {
    e.preventDefault()
    axios.get(`https://pokeapi.co/api/v2/pokemon/${update}`).then((response) => {
      setSearchedPokemon(response.data)
      console.log(response.data)
    }).catch(error => {
      setSearchedPokemon({error: true, message: "We didn't find a Pokemon with that name"})
      console.log(error.response)
    })
  }
  
  const clickSearch = (e) => {
    console.log()
    // setUpdate(e.target.value)
    // axios.get(`https://pokeapi.co/api/v2/pokemon/${update}`).then((response) => {
    //   setSearchedPokemon(response.data)
    // })
  }

  if (searchedPokemon) {
    if (searchedPokemon.error === true) {
      indPokemonShow = (
        <Grid container justify="center" alignItems="center" direction='column'>
          <Typography>{searchedPokemon.message}</Typography>
        </Grid>
      )
    } else {
      if (searchedPokemon.types[1] !== undefined) {
        secondType = '/' + searchedPokemon.types[1].type.name;
      }
      indPokemonShow = (
        <Grid container justify="center" alignItems="center" direction='column'>
          <Typography xs={12} variant="h4" className={classes.pokeShow} align='center'>{searchedPokemon.name}</Typography>
          <Typography>***Base stats***</Typography>
          <Typography>Id: #{searchedPokemon.id}</Typography>
          <Typography>Type: {searchedPokemon.types[0].type.name}{secondType}</Typography>
          <Typography>Weight: {searchedPokemon.weight}</Typography>
          <Typography>Height: {searchedPokemon.height}</Typography>
          <Typography>Speed: {searchedPokemon.stats[0].base_stat}</Typography>
          <Typography>Special-Defense: {searchedPokemon.stats[1].base_stat}</Typography>
          <Typography>Special-Attack: {searchedPokemon.stats[2].base_stat}</Typography>
          <Typography>Defense: {searchedPokemon.stats[3].base_stat}</Typography>
          <Typography>Attack: {searchedPokemon.stats[4].base_stat}</Typography>
          <Typography>HP: {searchedPokemon.stats[5].base_stat}</Typography>
          <div>
            <img src={searchedPokemon.sprites.front_default} className='pokemonShow bounce-7' />
          </div>
        </Grid>
      )
    }
  }
  if (pokemonData && pokemonData.results !== undefined) {
    next = () => {
      axios.get(pokemonData.next).then((response) => {
        setPokemonData(response.data)
      })
    }
    previous = () => {
      axios.get(pokemonData.previous).then((response) => {
        setPokemonData(response.data)
      })
    }
    if (pokemonData && pokemonData.previous) {
      previousButton = (
        <BottomNavigationAction label="Previous 20" onClick={previous} icon={<NavigateBeforeIcon />} />
      )
    }
    
    mappedPokemon = (
      <div className={classes.gridListRoot}>
          <GridList cellHeight={80} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            </GridListTile>
            {pokemonData.results.map(pokemon => (
              <GridListTile key={pokemon.name} id={pokemon.name}>
                {/* <div onClick={clickSearch} name={pokemon.name}> */}
                  <GridListTileBar
                    onClick={clickSearch}
                    title={pokemon.name}
                    actionIcon={
                      <IconButton aria-label={`info about ${pokemon.name}`} className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                {/* </div> */}
              </GridListTile>
            ))}
          </GridList>
        </div>
    )
  } else if (!pokemonData) {
    mappedPokemon = (
      <br/>
    )
  }
  
  return (
    <div className={classes.root}>
      <div>
        <img className='main' src="https://i.kym-cdn.com/photos/images/original/001/024/523/1c7.jpg" alt="MainLogo"/>
        <Typography variant='h5' align='center'>Welcome to Miguel's Pokedex</Typography>
        <Typography variant='subtitle1' align='center'>Search for a Pokemon by number or name</Typography>
      </div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Miguel's Pokedex
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon  />
            </div>
            <form action="GET" onSubmit={search}>
              <InputBase
                onChange={updateSearch}
                placeholder="Pokemon..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button type='submit' variant="outlined" color="inherit">Search</Button>
            </form>
          </div>
        </Toolbar>
      </AppBar>
      {/* //? render searched pokemon from search bar */}
      {indPokemonShow}
      {/* //? create a map for all pokemon data retrieved with gridlist */}
      {mappedPokemon}
      <BottomNavigation
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        showLabels
        className={classes.root}
      >
        {previousButton}
        <BottomNavigationAction label="Next 20" onClick={next} icon={<NavigateNextIcon />} />
      </BottomNavigation>
    </div>
  );
}