import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
} from "@/api/zones";
import { COLORS, CommonStyles } from "@/components/style";
import { FONTS, SIZES } from "./style";
import { TextInput } from "react-native-paper";

const Dropdown = ({ label, data, selectedId, onSelect, placeholder, defaultValue = "" }) => {
  const [query, setQuery] = useState(defaultValue);
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [query, data]);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSelect = (item) => {
    setQuery(item.name);
    onSelect(item);
    setShowList(false);
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        style={{
          fontFamily: 'Lexend-Deca-Regular',
          fontSize: SIZES.body4,
          marginBottom: SIZES.base,
        }}
        value={query}
        placeholder={placeholder}
        outlineColor={COLORS.gray2}
        activeOutlineColor={COLORS.primary}
        onChangeText={(text) => {
          setQuery(text);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
      />
      {showList && filtered.length > 0 && (
        <ScrollView
          style={{
            backgroundColor: COLORS.white,
            maxHeight: 200,
            marginTop: -8,

            // Shadow for iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            // Shadow for Android
            elevation: 3,
          }}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSelect(item)}
              onPressIn={() => setHoveredId(item.id)}
              onPressOut={() => setHoveredId(null)}
              style={{
                padding: 10,
                paddingHorizontal: SIZES.base * 2,
                backgroundColor: hoveredId === item.id ? COLORS.gray2 : COLORS.white,
              }}
            >
              <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const ZoneSelect = ({ values, setFieldValue, errors, touched }) => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provinceRes = await getProvinces("");
      const provinceData = provinceRes.data;
      setProvinces(provinceData);

      if (values.province_id) {
        const regencyRes = await getRegencies("", values.province_id);
        const regencyData = regencyRes.data;
        setRegencies(regencyData);

        if (values.regency_id) {
          const districtRes = await getDistricts("", values.regency_id);
          const districtData = districtRes.data;
          setDistricts(districtData);

          if (values.district_id) {
            const villageRes = await getVillages("", values.district_id);
            const villageData = villageRes.data;
            setVillages(villageData);
          }
        }
      }
    };
    init();
  }, []);

  const handleProvinceSelect = async (province) => {
    if (province.id === values.province_id) return; // tidak perlu update jika sama

    setFieldValue("province_id", province.id);
    setFieldValue("regency_id", "");
    setFieldValue("district_id", "");
    setFieldValue("village_id", "");
    setRegencies([]);
    setDistricts([]);
    setVillages([]);

    const response = await getRegencies("", province.id);
    setRegencies(response.data);
  };

  const handleRegencySelect = async (regency) => {
    if (regency.id === values.regency_id) return;

    setFieldValue("regency_id", regency.id);
    setFieldValue("district_id", "");
    setFieldValue("village_id", "");
    setDistricts([]);
    setVillages([]);

    const response = await getDistricts("", regency.id);
    setDistricts(response.data);
  };

  const handleDistrictSelect = async (district) => {
    if (district.id === values.district_id) return;

    setFieldValue("district_id", district.id);
    setFieldValue("village_id", "");
    setVillages([]);

    const response = await getVillages("", district.id);
    setVillages(response.data);
  };

  const handleVillageSelect = (village) => {
    setFieldValue("village_id", village.id);
  };

  return (
    <View>
      <Dropdown
        label="Provinsi"
        data={provinces}
        selectedId={values.province_id}
        onSelect={handleProvinceSelect}
        placeholder="Cari Provinsi..."
        defaultValue={provinces.find(p => p.id === values.province_id)?.name || ""}
      />
      {touched.province_id && errors.province_id && (
        <Text style={CommonStyles.errorText}>{errors.province_id}</Text>
      )}

      <Dropdown
        label="Kota/Kabupaten"
        data={regencies}
        selectedId={values.regency_id}
        onSelect={handleRegencySelect}
        placeholder="Cari Kota/Kabupaten..."
        defaultValue={regencies.find(r => r.id === values.regency_id)?.name || ""}
      />
      {touched.regency_id && errors.regency_id && (
        <Text style={CommonStyles.errorText}>{errors.regency_id}</Text>
      )}

      <Dropdown
        label="Kecamatan"
        data={districts}
        selectedId={values.district_id}
        onSelect={handleDistrictSelect}
        placeholder="Cari Kecamatan..."
        defaultValue={districts.find(d => d.id === values.district_id)?.name || ""}
      />
      {touched.district_id && errors.district_id && (
        <Text style={CommonStyles.errorText}>{errors.district_id}</Text>
      )}

      <Dropdown
        label="Kelurahan"
        data={villages}
        selectedId={values.village_id}
        onSelect={handleVillageSelect}
        placeholder="Cari Kelurahan..."
        defaultValue={villages.find(v => v.id === values.village_id)?.name || ""}
      />
      {touched.village_id && errors.village_id && (
        <Text style={CommonStyles.errorText}>{errors.village_id}</Text>
      )}
    </View>
  );
};

export default ZoneSelect;
