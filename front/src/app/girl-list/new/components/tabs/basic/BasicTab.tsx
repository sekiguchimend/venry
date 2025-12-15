'use client';

import React, { useState } from 'react';
import { Calendar, HelpCircle as QuestionIcon, Image as ImageIcon } from 'lucide-react';
import BasicLeftColumn from './BasicLeftColumn';
import BasicRightColumn from './BasicRightColumn';

export interface BasicFormData {
  name: string;
  katakana: string;
  hiragana: string;
  romaji: string;
  joinDate: string;
  age: string;
  birthday: string;
  bust: string;
  cup: string;
  waist: string;
  hip: string;
  height: string;
  weight: string;
  bloodType: string;
  style: string;
  type: string;
  catchCopy10: string;
  catchCopy20: string;
  sensitiveZone: string;
  hobby: string;
  specialty: string;
  charmPoint: string;
  favoriteType: string;
  firstExperience: string;
  birthplace: string;
  zodiac: string;
  alcohol: string;
  tobacco: string;
  faceOut: string;
  mobileEmail: string;
  pcEmail: string;
}

export default function BasicTab() {
  const [isPublic, setIsPublic] = useState(false);
  const [isNewcomer, setIsNewcomer] = useState(false);
  const [linkBirthday, setLinkBirthday] = useState(false);

  const [formData, setFormData] = useState<BasicFormData>({
    name: '',
    katakana: '',
    hiragana: '',
    romaji: '',
    joinDate: '',
    age: '',
    birthday: '',
    bust: '',
    cup: 'A',
    waist: '',
    hip: '',
    height: '',
    weight: '',
    bloodType: '未選択',
    style: 'スタンダード',
    type: 'かわいい系',
    catchCopy10: '',
    catchCopy20: '',
    sensitiveZone: '',
    hobby: '',
    specialty: '',
    charmPoint: '',
    favoriteType: '',
    firstExperience: '',
    birthplace: '',
    zodiac: '',
    alcohol: '飲まない',
    tobacco: '吸わない',
    faceOut: '設定しない',
    mobileEmail: '',
    pcEmail: '',
  });

  const handleInputChange = (field: keyof BasicFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex gap-8">
      <BasicLeftColumn
        ImageIcon={ImageIcon}
        Calendar={Calendar}
        QuestionIcon={QuestionIcon}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        isNewcomer={isNewcomer}
        setIsNewcomer={setIsNewcomer}
        linkBirthday={linkBirthday}
        setLinkBirthday={setLinkBirthday}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <BasicRightColumn
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}


