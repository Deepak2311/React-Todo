import React, { Fragment } from 'react';
import universal from 'react-universal-component';
import { Route, Switch, Redirect } from 'react-router';
import Nav from '../Components/Nav';
import '../assets/css/globals.css';
import Head from '../Components/Head';
import Loading from '../Components/Loading';
import { RedirectWithStatus } from '../Components/RedirectStatus';
import riangle from '../assets/images/riangle.svg';

const UniversalComponent = universal(props => import(`../Views/${props.page}`), {
	loading: () => <Loading />,
	ignoreBabelRename: true,
});

export default ({ staticContext, lang }) => (
	<Fragment>
		{/* <GoogleTagManager gtmId="GTM-XXXXXXX" /> */}
		<Head />
		<Nav lang={lang} />
		<Switch>
			<Route
				exact
				path="/"
				render={routeProps => <UniversalComponent page="Home" {...routeProps} />}
			/>
			<Route
				exact
				path="/:lang/about"
				render={routeProps => <UniversalComponent page="About" {...routeProps} />}
			/>
			<Route
				exact
				path="/:lang/article"
				render={routeProps => <UniversalComponent page="Article" {...routeProps} />}
			/>
			<RedirectWithStatus status={301} exact from="/" to={`/${lang}`} />
			<Route render={routeProps => <UniversalComponent page="NotFound" {...routeProps} />} />
		</Switch>
		<footer>
			<a href="https://www.riangle.com/" target="_blank">
				<img src={riangle} alt="Riangle Logo" />
			</a>
		</footer>
	</Fragment>
);
