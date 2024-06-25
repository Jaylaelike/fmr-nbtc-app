
"use client" 
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jTIGAZ4sxQN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { ResponsiveBar } from '@nivo/bar'

export default function page() {
  return (
    <div className="p-4 space-y-4 pt-20">
      <section className="bg-purple-700 p-4 rounded-lg text-white">
        <h2 className="text-2xl font-bold">Scan</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="bg-yellow-500 text-black rounded-full px-4 py-2">10 km</button>
          <button className="bg-yellow-500 text-black rounded-full px-4 py-2">20 km</button>
          <button className="bg-yellow-500 text-black rounded-full px-4 py-2">30 km</button>
          <button className="bg-yellow-500 text-black rounded-full px-4 py-2">40 km</button>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-purple-600 p-4 rounded-lg text-white">
          <p>สถานี: Bangkok -8</p>
        </section>
        <section className="bg-purple-500 p-4 rounded-lg text-white">
          <p>ความถี่: 91</p>
        </section>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-300 p-4 rounded-lg text-white">
          <h2 className="text-2xl font-bold">Record</h2>
        </div>
        <div className="col-span-2 bg-red-400 p-4 rounded-lg text-white">
          <h2 className="text-2xl font-bold">Frequency Chart</h2>
          <LineChart className="w-full aspect-[4/3]" />
        </div>
      </section>
    </div>
  )
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={
            [
                {
                  "country": "AD",
                  "hot dog": 167,
                  "hot dogColor": "hsl(195, 70%, 50%)",
                  "burger": 183,
                  "burgerColor": "hsl(14, 70%, 50%)",
                  "sandwich": 17,
                  "sandwichColor": "hsl(13, 70%, 50%)",
                  "kebab": 6,
                  "kebabColor": "hsl(116, 70%, 50%)",
                  "fries": 77,
                  "friesColor": "hsl(123, 70%, 50%)",
                  "donut": 99,
                  "donutColor": "hsl(39, 70%, 50%)"
                },
                {
                  "country": "AE",
                  "hot dog": 133,
                  "hot dogColor": "hsl(60, 70%, 50%)",
                  "burger": 167,
                  "burgerColor": "hsl(172, 70%, 50%)",
                  "sandwich": 43,
                  "sandwichColor": "hsl(32, 70%, 50%)",
                  "kebab": 181,
                  "kebabColor": "hsl(203, 70%, 50%)",
                  "fries": 31,
                  "friesColor": "hsl(239, 70%, 50%)",
                  "donut": 174,
                  "donutColor": "hsl(17, 70%, 50%)"
                },
                {
                  "country": "AF",
                  "hot dog": 75,
                  "hot dogColor": "hsl(113, 70%, 50%)",
                  "burger": 57,
                  "burgerColor": "hsl(355, 70%, 50%)",
                  "sandwich": 193,
                  "sandwichColor": "hsl(155, 70%, 50%)",
                  "kebab": 177,
                  "kebabColor": "hsl(322, 70%, 50%)",
                  "fries": 79,
                  "friesColor": "hsl(47, 70%, 50%)",
                  "donut": 163,
                  "donutColor": "hsl(96, 70%, 50%)"
                },
                {
                  "country": "AG",
                  "hot dog": 131,
                  "hot dogColor": "hsl(311, 70%, 50%)",
                  "burger": 94,
                  "burgerColor": "hsl(183, 70%, 50%)",
                  "sandwich": 169,
                  "sandwichColor": "hsl(157, 70%, 50%)",
                  "kebab": 5,
                  "kebabColor": "hsl(332, 70%, 50%)",
                  "fries": 89,
                  "friesColor": "hsl(164, 70%, 50%)",
                  "donut": 178,
                  "donutColor": "hsl(318, 70%, 50%)"
                },
                {
                  "country": "AI",
                  "hot dog": 177,
                  "hot dogColor": "hsl(137, 70%, 50%)",
                  "burger": 41,
                  "burgerColor": "hsl(130, 70%, 50%)",
                  "sandwich": 67,
                  "sandwichColor": "hsl(322, 70%, 50%)",
                  "kebab": 57,
                  "kebabColor": "hsl(47, 70%, 50%)",
                  "fries": 157,
                  "friesColor": "hsl(129, 70%, 50%)",
                  "donut": 43,
                  "donutColor": "hsl(150, 70%, 50%)"
                },
                {
                  "country": "AL",
                  "hot dog": 116,
                  "hot dogColor": "hsl(85, 70%, 50%)",
                  "burger": 30,
                  "burgerColor": "hsl(83, 70%, 50%)",
                  "sandwich": 66,
                  "sandwichColor": "hsl(309, 70%, 50%)",
                  "kebab": 96,
                  "kebabColor": "hsl(319, 70%, 50%)",
                  "fries": 12,
                  "friesColor": "hsl(157, 70%, 50%)",
                  "donut": 23,
                  "donutColor": "hsl(320, 70%, 50%)"
                },
                {
                  "country": "AM",
                  "hot dog": 175,
                  "hot dogColor": "hsl(278, 70%, 50%)",
                  "burger": 149,
                  "burgerColor": "hsl(176, 70%, 50%)",
                  "sandwich": 158,
                  "sandwichColor": "hsl(135, 70%, 50%)",
                  "kebab": 56,
                  "kebabColor": "hsl(85, 70%, 50%)",
                  "fries": 144,
                  "friesColor": "hsl(20, 70%, 50%)",
                  "donut": 136,
                  "donutColor": "hsl(338, 70%, 50%)"
                }
              ]
              
        }
     enableGridX={true}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
    </div>
  )
}
