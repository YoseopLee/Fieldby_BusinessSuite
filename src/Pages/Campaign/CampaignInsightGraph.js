import React from "react";
import styled from "styled-components";
import { ResponsiveBar } from "@nivo/bar";

const data = [
    {
      "country": "AD",
      "hot dog": 100,
      "hot dogColor": "hsl(279, 70%, 50%)",
      "burger": 91,
      "burgerColor": "hsl(106, 70%, 50%)",
      "sandwich": 106,
      "sandwichColor": "hsl(60, 70%, 50%)",
      "kebab": 64,
      "kebabColor": "hsl(19, 70%, 50%)",
      "fries": 68,
      "friesColor": "hsl(314, 70%, 50%)",
      "donut": 151,
      "donutColor": "hsl(78, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 130,
      "hot dogColor": "hsl(26, 70%, 50%)",
      "burger": 160,
      "burgerColor": "hsl(54, 70%, 50%)",
      "sandwich": 101,
      "sandwichColor": "hsl(69, 70%, 50%)",
      "kebab": 47,
      "kebabColor": "hsl(164, 70%, 50%)",
      "fries": 168,
      "friesColor": "hsl(153, 70%, 50%)",
      "donut": 77,
      "donutColor": "hsl(48, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 164,
      "hot dogColor": "hsl(358, 70%, 50%)",
      "burger": 197,
      "burgerColor": "hsl(211, 70%, 50%)",
      "sandwich": 109,
      "sandwichColor": "hsl(228, 70%, 50%)",
      "kebab": 165,
      "kebabColor": "hsl(43, 70%, 50%)",
      "fries": 165,
      "friesColor": "hsl(100, 70%, 50%)",
      "donut": 84,
      "donutColor": "hsl(59, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 85,
      "hot dogColor": "hsl(140, 70%, 50%)",
      "burger": 122,
      "burgerColor": "hsl(25, 70%, 50%)",
      "sandwich": 18,
      "sandwichColor": "hsl(114, 70%, 50%)",
      "kebab": 9,
      "kebabColor": "hsl(66, 70%, 50%)",
      "fries": 70,
      "friesColor": "hsl(249, 70%, 50%)",
      "donut": 158,
      "donutColor": "hsl(216, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 184,
      "hot dogColor": "hsl(302, 70%, 50%)",
      "burger": 10,
      "burgerColor": "hsl(46, 70%, 50%)",
      "sandwich": 184,
      "sandwichColor": "hsl(237, 70%, 50%)",
      "kebab": 116,
      "kebabColor": "hsl(96, 70%, 50%)",
      "fries": 100,
      "friesColor": "hsl(239, 70%, 50%)",
      "donut": 197,
      "donutColor": "hsl(327, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 121,
      "hot dogColor": "hsl(81, 70%, 50%)",
      "burger": 189,
      "burgerColor": "hsl(128, 70%, 50%)",
      "sandwich": 10,
      "sandwichColor": "hsl(137, 70%, 50%)",
      "kebab": 38,
      "kebabColor": "hsl(195, 70%, 50%)",
      "fries": 91,
      "friesColor": "hsl(306, 70%, 50%)",
      "donut": 160,
      "donutColor": "hsl(324, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 153,
      "hot dogColor": "hsl(200, 70%, 50%)",
      "burger": 77,
      "burgerColor": "hsl(133, 70%, 50%)",
      "sandwich": 53,
      "sandwichColor": "hsl(189, 70%, 50%)",
      "kebab": 183,
      "kebabColor": "hsl(17, 70%, 50%)",
      "fries": 129,
      "friesColor": "hsl(22, 70%, 50%)",
      "donut": 69,
      "donutColor": "hsl(238, 70%, 50%)"
    }
  ]

const CampaignInsightGraph = () => {

    return (
        <CampaignInsightGraphCSS>
            <ResponsiveBar
            data={data}
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
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
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
            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        />
        </CampaignInsightGraphCSS>
    )
}

const CampaignInsightGraphCSS = styled.div`
    height : 400px;
`

export default CampaignInsightGraph;