import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";
import { bodyParts } from "./../constants/Index";
import { fetchExec } from "./api/exerciseDB";
import exercises from "./exercises";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ExercisesList from "../components/ExercisesList";
import { ScrollView } from "react-native-virtualized-view";

const exercises = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    if (item) {
      getExec(item.name);
    }
  }, [item]);

  const getExec = async (bodyParts) => {
    let data = await fetchExec(bodyParts);
    setExercises(data);
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.Image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        className="bg-rose-500 mx-4 absolute rounded-full flex justify-center items-center pr-1"
        style={{ width: wp(5.5), height: hp(5.5), marginTop: hp(7) }}
        onPress={() => router.back()}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>
      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          {item.name} exercises
        </Text>
        <View className="mb-10">
          <ExercisesList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
};

export default exercises;
