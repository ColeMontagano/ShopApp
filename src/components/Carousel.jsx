import React, { Component } from 'react'
import '../App.css'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap'
import axios from 'axios';

class ShopCarousel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeIndex : 0,
			carouselItems : []
		}
		this.next = this.next.bind(this)
		this.previous = this.previous.bind(this)
		this.goToIndex = this.goToIndex.bind(this)
		this.onExiting = this.onExiting.bind(this)
		this.onExited = this.onExited.bind(this)
	}

	componentDidMount() {
		axios.get('http://localhost:8080/').then(({ data }) => {
			this.setState({
				carouselItems  : data.carousel
			})
		})
	}


	onExiting() {
		this.animating = true
	}

	onExited() {
		this.animating = false
	}

	next() {
		if (this.animating) return
		const nextIndex =

				this.state.activeIndex ===	this.state.carouselItems.length - 1 ? 0 :
				this.state.activeIndex + 1
		this.setState({ activeIndex: nextIndex })
	}

	previous() {
		if (this.animating) return
		const nextIndex =

				this.state.activeIndex === 0 ? this.state.carouselItems.length - 1 :
				this.state.activeIndex - 1
		this.setState({ activeIndex: nextIndex })
	}

	goToIndex(newIndex) {
		if (this.animating) return
		this.setState({ activeIndex: newIndex })
	}
	render() {
		if (this.state.carouselItems) {
			const { activeIndex } = this.state
			const slides = this.state.carouselItems.map((item, i) => {
				return (
					<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={i}>
						<img src={item.img} alt={item.name} />
					</CarouselItem>
				)
			})
			return (
				<Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
					<CarouselIndicators
						items={this.state.carouselItems}
						activeIndex={activeIndex}
						onClickHandler={this.goToIndex}
					/>
					{slides}
					<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
					<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
				</Carousel>
			)
		}
	}
}

export default ShopCarousel
