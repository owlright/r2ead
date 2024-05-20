import { PureComponent } from "react"
import { type NavItem } from 'epubjs'
import { TocItem } from './TocItem'
import React from "react"
import { ReactReaderStyle as defaultStyles, type IReactReaderStyle } from './style'
export type ITocProps = {
    title?: string
    showToc?: boolean
    tocChanged?: (toc: NavItem[]) => void
    locationChanged?: (loc: string) => void
    readerStyles?: IReactReaderStyle
}

type ITocState = {
    isLoaded: boolean
    expandedToc: boolean
    toc: NavItem[]
}

export class TocComponent extends PureComponent<ITocProps, ITocState> {
    state: Readonly<ITocState> = {
        isLoaded: false,
        expandedToc: false,
        toc: [],
    }

    toggleToc = () => {
        this.setState({
            expandedToc: !this.state.expandedToc,
        })
    }
    onTocChange = (toc: NavItem[]) => {
        const { tocChanged } = this.props
        this.setState(
            {
                toc: toc,
            },
            () => tocChanged && tocChanged(toc)
        )
    }
    setLocation = (loc: string) => {
        const { locationChanged } = this.props
        this.setState(
            {
                expandedToc: false,
            },
            () => locationChanged && locationChanged(loc)
        )
    }
    render() {
        const { toc, expandedToc } = this.state
        const {readerStyles = defaultStyles} = this.props
        return (
            <div>
                <div style={readerStyles.tocArea}>
                    <div style={readerStyles.toc}>
                        {toc.map((item, i) => (
                            <TocItem
                                data={item}
                                key={i}
                                setLocation={this.setLocation}
                                styles={readerStyles.tocAreaButton}
                            />
                        ))}
                    </div>
                </div>
                {expandedToc && (
                    <div style={readerStyles.tocBackground} onClick={this.toggleToc} />
                )}
            </div>
        )
    }
}