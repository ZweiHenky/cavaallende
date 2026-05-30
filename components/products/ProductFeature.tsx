import React from 'react'
import { Text, View } from 'react-native'
import NoseIcon from '@/assets/icons/NoseIcon';
import TongueIcon from '@/assets/icons/TongueIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import GrapesIcon from '@/assets/icons/GrapesIcon';
import BarrelIcon from '@/assets/icons/BarrelIcon';
import CalendarIcon from '@/assets/icons/CalendarIcon';
import ThermoControlIcon from '@/assets/icons/ThermoControlIcon';
import LikeIcon from '@/assets/icons/LikeIcon';

interface ProductFeatureProps {
  text: string;
  numberOfLines?: number;
  type?: 'nose' | 'mouth' | 'eye' | 'grapes' | 'barrel' | 'calendar' | 'thermo-control' | 'like';
}

export default function ProductFeature({ text, numberOfLines, type }: ProductFeatureProps) {
  if (!text) return null;
  return (
    <View className='flex-row items-center gap-3 w-[90%] mx-auto shadow-sm bg-white p-3 rounded-2xl border border-gray-50'>
      <View className='rounded-xl p-2.5 bg-gray-50'>
        {type === 'eye' ? <EyeIcon size={24} color="#c9a24d" /> : null}
        {type === 'nose' ? <NoseIcon size={24} color="#c9a24d" /> : null}
        {type === 'mouth' ? <TongueIcon size={24} color="#c9a24d" /> : null}
        {type === 'grapes' ? <GrapesIcon size={24} color="#c9a24d" /> : null}
        {type === 'barrel' ? <BarrelIcon size={24} color="#c9a24d" /> : null}
        {type === 'calendar' ? <CalendarIcon size={24} color="#c9a24d" /> : null}
        {type === 'thermo-control' ? <ThermoControlIcon size={24} color="#c9a24d" /> : null}
        {type === 'like' ? <LikeIcon size={24} color="#c9a24d" /> : null}
      </View>
      <View className='flex-col gap-2 flex-shrink'>
        {type === 'grapes' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Variedad:</Text> : null}
        {type === 'barrel' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Fermentación:</Text> : null}
        {type === 'calendar' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Añada:</Text> : null}
        {type === 'thermo-control' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Control de temperatura:</Text> : null}
        {type === 'like' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Recomendación:</Text> : null}
        {type === 'nose' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Nariz:</Text> : null}
        {type === 'mouth' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Boca:</Text> : null}
        {type === 'eye' ? <Text className='font-fraunces-semibold text-xl text-secondary'>Vista:</Text> : null}
        <Text
          numberOfLines={numberOfLines}
          ellipsizeMode={numberOfLines ? "tail" : undefined}
          className='text-[15px] font-medium text-gray-700 flex-shrink pr-2'
        >  
          {text}
        </Text>
      </View>
    </View>
  )
}