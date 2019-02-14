import React, { Component } from 'react'
import '../App.css'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap'

class ShopCarousel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeIndex : 0
		}
		this.next = this.next.bind(this)
		this.previous = this.previous.bind(this)
		this.goToIndex = this.goToIndex.bind(this)
		this.onExiting = this.onExiting.bind(this)
		this.onExited = this.onExited.bind(this)
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

				this.state.activeIndex === this.props.items.length - 1 ? 0 :
				this.state.activeIndex + 1
		this.setState({ activeIndex: nextIndex })
	}

	previous() {
		if (this.animating) return
		const nextIndex =

				this.state.activeIndex === 0 ? this.props.items.length - 1 :
				this.state.activeIndex - 1
		this.setState({ activeIndex: nextIndex })
	}

	goToIndex(newIndex) {
		if (this.animating) return
		this.setState({ activeIndex: newIndex })
	}
	render() {
		if (this.props.items) {
			const { activeIndex } = this.state
			const slides = this.props.items.map((item, i) => {
				return (
					<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={i}>
						<img src={item.img} alt={item.name} />
						<CarouselCaption captionText={item.name} />
					</CarouselItem>
				)
			})
			return (
				<Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
					<CarouselIndicators
						items={this.props.items}
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
