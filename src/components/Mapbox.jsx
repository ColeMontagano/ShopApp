import React, { Component } from 'react'
import MapGL, { Marker, NavigationControl } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoiY21vbnQyMyIsImEiOiJjam90MjBsbXQwd3RtM3BwdDEzaGIzeHpsIn0.Ba2XglradkNUW4i7rOhUgw'

class Mapbox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			viewport : {
				latitude  : 40.4,
				longitude : -79.8,
				zoom      : 13,
				bearing   : 0,
				pitch     : 0,
				width     : 400,
				height    : 300
			}
		}
	}

	_updateViewport = (viewport) => {
		this.setState({ viewport })
	}

	render() {
		const { viewport } = this.state
		return (
			<MapGL
				{...viewport}
				{...this.state.viewport}
				onViewportChange={(viewport) => this.setState({ viewport })}
				mapStyle={'mapbox://styles/cmont23/cjot39p8hcyd72sqoyj0fzx66'}
				mapboxApiAccessToken={TOKEN}>
				<div className="nav mapNav">
					<NavigationControl onViewportChange={this._updateViewport} />
					<Marker latitude={40.4008997} longitude={-79.8} offsetLeft={-20} offsetTop={-10}>
						<div className="marker" />
					</Marker>
				</div>
			</MapGL>
		)
	}
}

export default Mapbox
