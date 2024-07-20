import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Animated from "react-native-reanimated";

const exerciseDetails = () => {
  const item = useLocalSearchParams();
  const router = useRouter();
  return (
    <View className="flex flex-1">
      <View className="shadow-md bg-neutral-200 rounded-b-[40px]">
        <Image
          source={{ uri: item.gifUrl }}
          contentFit="cover"
          style={{ width: wp(100), height: wp(100) }}
          className="rounded-b-[40px ]"
        />
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        className="mx-2 absolute rounded-full mt-2 right-0"
      >
        <AntDesign name="closecircle" size={hp(4.5)} color="#f43f5e" />
      </TouchableOpacity>
      <ScrollView
        className="mx-4 space-y-2 mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          className="font-semibold text-neutral-800 tracking-wide"
          style={{ fontSize: hp(3.5) }}
        >
          {item.name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(2) }}
        >
          Equipment{" "}
          <Text className="font-bold text-neutral-800">{item?.equipment}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(200).springify()}
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(2) }}
        >
          Secondary Muscle{" "}
          <Text className="font-bold text-neutral-800">
            {item?.secondaryMuscles}
          </Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(2) }}
        >
          Target
          <Text className="font-bold text-neutral-800">{item?.target}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(3.5) }}
        >
          Instructions
          <Text className="font-bold text-neutral-800">
            {item?.instructions.split(",").map((instruction, index) => {
              return (
                <Animated.Text
                  entering={FadeInDown.delay((index + 6) * 100)
                    .duration(300)
                    .springify()}
                  style={{ fontSize: hp(1.7) }}
                  className="text-neutral800"
                  key={instruction}
                >
                  {instruction}
                </Animated.Text>
              );
            })}
          </Text>
        </Animated.Text>
      </ScrollView>
    </View>
  );
};

export default exerciseDetails;
