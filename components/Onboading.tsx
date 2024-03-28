import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {FC, ReactElement} from 'react'
import Animated, {
    SharedValue,
    interpolate,
    interpolateColor,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import {Height, Width} from '../utils/constants'

const N = 10;


export default function Onboading() {
    const x = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler(({contentOffset}) => {
        x.value = contentOffset.x
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome</Text>
            <View>
                <Animated.ScrollView
                    bounces
                    horizontal
                    pagingEnabled
                    onScroll={onScroll}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                >
                    {Array(N).fill('').map((_, i) => (
                        <Card
                            key={i}
                            index={i}
                            x={x}
                        />
                    ))}
                </Animated.ScrollView>
            </View>
            <Swither
                x={x}
            />
            <Button/>
        </View>
    )
}


interface CardProps {
    index: number,
    x: SharedValue<number>
}

interface SwitcherProps {
    x: SharedValue<number>
}


const Button: FC = () => (
    <TouchableOpacity style={styles.button}>
        <Text style={styles.btn}>Buy Coffeer</Text>
    </TouchableOpacity>
)


const Swither: FC<SwitcherProps> = ({x}) => {

    const uas = useAnimatedStyle(() => {
        const translateX = (x.value / Width) * 20;

        return {
            position: 'absolute',
            left: 0,
            backgroundColor: 'rgba(0,0,0,.2)',
            transform: [
                {translateX}
            ]
        }
    });

    return (
        <View style={styles.switcher}>
            {Array(N).fill('').map((_, i) => (
                <View
                    key={i}
                    style={styles.ball}
                />
            ))}
            <Animated.View
                style={[
                    styles.ball,
                    uas
                ]}
            />
        </View>
    )
}


const Card: FC<CardProps> = ({index, x}) => {
    const uas = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [(index - 1) * Width, index * Width, (index + 1) * Width],
            [.8, 1, .8]
        )
        const opacity = interpolate(
            x.value,
            [(index - 1) * Width, index * Width, (index + 1) * Width],
            [0, 1, 0]
        )
        const translateX = interpolate(
            x.value,
            [(index - 1) * Width, index * Width, (index + 1) * Width],
            [-500, 0, 0]
        )
        return {
            opacity,
            transform: [
                {scale},
                {translateX}
            ]
        }
    });

    return (
        <Animated.View
            style={[
                styles.card,
                uas
            ]}
        >
            <View
                style={{
                    ...styles.content,
                    backgroundColor: `rgba(0,0,0,0.${index + 1})`
                }}
            />
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: Height / 10,
        flex: 1,
    },
    card: {
        width: Width,
        height: Height / 2.4,
        padding: 10
    },
    content: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    text: {
        marginLeft: 10,
        marginBottom: 50,
        fontSize: 35,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,.8)'
    },
    switcher: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginLeft: 10,
        marginTop: Height / 50
    },
    ball: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    button: {
        width: Width / 3,
        alignItems: 'center',
        marginTop: Height / 20,
        marginLeft: 10,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: 'rgba(0,0,0,7)'
    },
    btn: {
        color: 'white',
        opacity: .9,
        fontWeight: '700'
    }
})