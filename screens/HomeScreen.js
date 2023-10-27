import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {themeColors} from '../theme'
import { MapPinIcon} from 'react-native-heroicons/solid'
import {BellIcon, MagnifyingGlassIcon, } from 'react-native-heroicons/outline'
import {categories, coffeeItems} from '../constants'
import Carousel from 'react-native-snap-carousel'
import CoffeeCard from '../components/coffeeCard'

export default function HomeScreen() {

    const [activeCategory, setActiveCategory] = useState(1)

  return (
    <View className="flex-1 relative bg-white mt-3">
        <StatusBar />
        <Image source={require('../assets/images/beansBackground1.png')}
        className="w-full absolute -top-5 opacity-10"
        style={{height: 220}}
        />
        <SafeAreaView className="flex-1">
            <View className="px-4 flex-row justify-between items-center">
                <Image source={require('../assets/images/avatar.png')}
                className="h-9 w-9 rounded-full" />
                <View className="flex-row items-center space-x-2">
                    <MapPinIcon size="25" color={themeColors.bgLight} />
                    <Text className="text-base font-semibold">Warsaw, Poland</Text>
                </View>
                <BellIcon size="27" color="black"/>
            </View>

            <View className="mx-5 mt-14 h-16">
                <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
                    <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700"/>
                    <TouchableOpacity className="rounded-full p-2"
                        style={{backgroundColor: themeColors.bgLight}}
                    >
                        <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="px-5 mt-6">
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={item => item.id}
                className="overflow-visible"
                renderItem={({item }) =>{
                    isActive = item.id==activeCategory;
                    let activeTextClass = isActive? 'text-white': 'text-gray-700';
              return (
                <TouchableOpacity 
                onPress={()=> setActiveCategory(item.id)}
                style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                className="p-4 px-5 mr-2 rounded-full shadow">
                  <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
                    )
                }}
                />
                </View>
                <View className="mt-3 py-2">
                <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={coffeeItems}
            loop={true}
            renderItem={({item})=> <CoffeeCard item={item} />}
            firstItem={1}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={400}
            itemWidth={260}
            slideStyle={{display: 'flex', alignItems: 'center'}}
          />
                </View>
        </SafeAreaView>
    </View>
  )
}