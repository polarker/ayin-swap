import { AlephiumConnectButton } from '@alephium/web3-react';
import { AppBar, Hidden, Link, makeStyles, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../muiTheme';
import TransactionSettings from './Settings';
import { reset as resetSwapState } from '../state/swap/actions';
import { reset as resetMintState } from '../state/mint/actions';

const useStyles = makeStyles((theme) => ({
  spacer: {
    height: '1rem',
  },
  appBar: {
    background: COLORS.nearBlackWithMinorTransparency,
    '& > .MuiToolbar-root': {
      margin: '.5rem 0rem 0rem 1rem',
      width: '100%',
    },
  },
  link: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(6),
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1),
    },
    '&.active': {
      color: theme.palette.primary.light,
    },
  },
}));

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <AppBar
      position="static"
      color="inherit"
      className={classes.appBar}
      elevation={0}
    >
      <Toolbar>
        <div className={classes.spacer} />
        <Hidden implementation="css" xsDown>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              component={NavLink}
              to="/presale"
              color="inherit"
              className={classes.link}
            >
              Presale
            </Link>
            <Link
              component={NavLink}
              to="/swap"
              color="inherit"
              className={classes.link}
              onClick={() => {
                dispatch(resetSwapState());
              }}
            >
              Trade
            </Link>
            <Link
              component={NavLink}
              to="/stake"
              color="inherit"
              className={classes.link}
            >
              Stake LP
            </Link>
            <Link
              component={NavLink}
              to="/xayin"
              color="inherit"
              className={classes.link}
            >
              XAYIN
            </Link>
            <Link
              component={NavLink}
              to="/add-liquidity"
              color="inherit"
              className={classes.link}
              onClick={() => {
                dispatch(resetMintState());
              }}
            >
              Pool
            </Link>
            <Link
              component={NavLink}
              to="/add-liquidity"
              color="inherit"
              className={classes.link}
              onClick={() => {
                dispatch(resetMintState());
              }}
            >
              Docs
            </Link>
            <Link
              component={NavLink}
              to="/add-liquidity"
              color="inherit"
              className={classes.link}
              onClick={() => {
                dispatch(resetMintState());
              }}
            >
              Discord
            </Link>
            {/* <Link */}
            {/*   component={NavLink} */}
            {/*   to="/remove-liquidity" */}
            {/*   color="inherit" */}
            {/*   className={classes.link} */}
            {/* > */}
            {/*   Remove Liquidity */}
            {/* </Link> */}
            {/* <Link */}
            {/*   component={NavLink} */}
            {/*   to="/add-pool" */}
            {/*   color="inherit" */}
            {/*   className={classes.link} */}
            {/* > */}
            {/*   Add Pool */}
            {/* </Link> */}
            {/* <Link */}
            {/*   component={NavLink} */}
            {/*   to="/pool" */}
            {/*   color="inherit" */}
            {/*   className={classes.link} */}
            {/* > */}
            {/*   Pool */}
            {/* </Link> */}
          </div>
        </Hidden>
        <div style={{ position: 'absolute', top: '6px', right: '30px' }}>
          <TransactionSettings />
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '80px' }}>
          <AlephiumConnectButton label="Connect Wallet" />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
