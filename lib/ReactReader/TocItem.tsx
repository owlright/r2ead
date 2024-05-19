import { type CSSProperties } from 'react'
import { type NavItem } from 'epubjs'

export type TocItemProps = {
    data: NavItem
    setLocation: (value: string) => void
    styles?: CSSProperties
}

export const TocItem = ({ data, setLocation, styles }: TocItemProps) => (
    <div>
        <button onClick={() => setLocation(data.href)} style={styles}>
            {data.label}
        </button>
        {data.subitems && data.subitems.length > 0 && (
            <div style={{ paddingLeft: 10 }}>
                {data.subitems.map((item, i) => (
                    <TocItem
                        key={i}
                        data={item}
                        styles={styles}
                        setLocation={setLocation}
                    />
                ))}
            </div>
        )}
    </div>
)
