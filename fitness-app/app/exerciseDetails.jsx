import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";

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
        <Text
          className="font-semibold text-neutral-800 tracking-wide"
          style={{ fontSize: hp(3.5) }}
        >
          {item.name}
        </Text>

        <Text
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(2) }}
        >
          Equipment{" "}
          <Text className="font-bold text-neutral-800">{item?.equipment}</Text>
        </Text>

        <Text
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(2) }}
        >
          Secondary Muscle{" "}
          <Text className="font-bold text-neutral-800">
            {item?.secondaryMuscles}
          </Text>
        </Text>

        <Text
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(2) }}
        >
          Target
          <Text className="font-bold text-neutral-800">{item?.target}</Text>
        </Text>

        <Text
          className="text-neutral-700 tracking-wide"
          style={{ fontSize: hp(3.5) }}
        >
          Instructions
          <Text className="font-bold text-neutral-800">
            {item?.instructions.split(",").map((instruction, index) => {
              return (
                <Text
                  style={{ fontSize: hp(1.7) }}
                  className="text-neutral800"
                  key={instruction}
                >
                  {instruction}
                </Text>
              );
            })}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default exerciseDetails;
