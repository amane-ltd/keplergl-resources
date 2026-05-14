# ベクタータイル詳細

Kepler.glで利用可能なPMTiles形式のベクタータイル。各リソースはPMTiles形式で配信。

## 利用手順

1. 読み込みしたいベクタータイルのURLをコピー
2. Kepler.gl を開く
3. 「Layers / レイヤ」タブを開く
4. ポップアップ内の「Tileset」タブをクリック
5. 「Tileset URL」にコピーしたURLをペースト
6. 緑色の「Add Tileset / タイルセットを追加」をクリック

---

## 交通

### 鉄道駅

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_kokudo__rail_station_info_pmt.pmtiles`

**概要**

全国の鉄道駅の位置情報をラインデータとして収録したベクタータイル。JR・私鉄・地下鉄・路面電車などの駅を含み、駅名・路線名・事業者名・乗降客数等の属性を持つ。

**元データ**
- [国土交通省国土数値情報ダウンロードサイト 鉄道データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2025.html)
- [国土交通省国土数値情報ダウンロードサイト 駅別乗降客数データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-S12-2024.html)

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)


### 鉄道路線

**URL**
`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_kokudo__rail_line_pmt.pmtiles`

**概要**

全国の鉄道路線をラインデータとして収録したベクタータイル。JR・私鉄・地下鉄・路面電車などの路線を含み、路線名・事業者名・区間等の属性を持つ。

**元データ**
- [国土交通省国土数値情報ダウンロードサイト 鉄道データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2025.html)

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)


### バス停

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_kokudo__bus_stop_pmt.pmtiles`

**概要**

全国のバス停留所の位置情報をポイントデータとして収録したベクタータイル。停留所名・路線名等の属性を持つ。

**元データ**

- [国土交通省国土数値情報ダウンロードサイト バス停留所データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P11-2022.html)

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)


### バス路線

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_kokudo__bus_line_pmt.pmtiles`

**概要**

全国のバス路線をラインデータとして収録したベクタータイル。事業者名等の属性を持つ。

**元データ**

- [国土交通省国土数値情報ダウンロードサイト バスルートデータ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N07-2022.html)


**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)


### シェアサイクルステーション

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_sharecycle__station_pmt.pmtiles`

**概要**

全国のシェアサイクルステーションの位置情報をポイントデータとして収録したベクタータイル。OpenStreet・ドコモ・バイクシェア等のサービスを含み、ステーション名・収容台数等の属性を持つ。

**元データ**
- [公共交通オープンデータセンター OpenStreet バイクシェア関連情報(station_information)](https://ckan.odpt.org/dataset/c_bikeshare_gbfs-openstreet/resource/d45e9650-b243-4f5a-bda6-c2b0cb61e8a3)
- [公共交通オープンデータセンター ドコモ・バイクシェア バイクシェア関連情報(station_information)](https://ckan.odpt.org/dataset/c_bikeshare_gbfs-d-nationwide-bikeshare/resource/addf55c2-d764-4d2c-9a89-f2a610663953)

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)

---

## 人口統計

### メッシュ人口

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_census2020_mesh5__all_pmt.pmtiles`

**概要**

令和2年国勢調査に基づく250mメッシュ(5次メッシュ)単位の人口データをポリゴンとして収録したベクタータイル。メッシュごとの総人口・世帯数等の属性を持つ。

**元データ**
- 総務省「令和2年国勢調査」 世界測地系（JGD2011）250mメッシュ

**ライセンス**
[PDL1.0](https://www.digital.go.jp/resources/open_data/public_data_license_v1.0)

**配布元**
[株式会社AMANE](https://amane.ltd/)


### 町丁目人口

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_census2020_town__map_with_all_pmt.pmtiles`

**概要**

令和2年国勢調査に基づく町丁・字等の境界単位の人口データをポリゴンとして収録したベクタータイル。町丁目ごとの総人口・世帯数等の属性を持つ。

**元データ**
- 総務省「令和2年国勢調査」 町丁・字等集計

**ライセンス**
[PDL1.0](https://www.digital.go.jp/resources/open_data/public_data_license_v1.0)

**配布元**
[株式会社AMANE](https://amane.ltd/)

---

## 都市計画

### 都市計画用途地域

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_kokudo__toshikeikaku_youto_pmt.pmtiles`

**概要**

全国の都市計画用途地域をポリゴンとして収録したベクタータイル。第一種低層住居専用地域・商業地域・工業地域など13種の用途地域区分や建ぺい率・容積率等の属性を持つ。

**元データ**
- [国土交通省国土数値情報ダウンロードサイト 都市計画決定情報データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A55-2024.html)

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)


### 都市計画区域区分

**URL**

`https://d1ea95yc41zb9r.cloudfront.net/pmtiles/jpn_kokudo__toshikeikaku_senbiki_pmt.pmtiles`

**概要**

全国の都市計画区域区分（線引き）をポリゴンとして収録したベクタータイル。市街化区域・市街化調整区域の区分属性を持つ。

**元データ**
- [国土交通省国土数値情報ダウンロードサイト 都市計画決定情報データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A55-2024.html)

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)

---

## 3D都市モデル

### 3D都市モデル（PLATEAU 2023 LOD0）

**URL**

`https://shiworks.xsrv.jp/pmtiles-data/plateau/PLATEAU_2023_LOD0.pmtiles`

**概要**

国土交通省Project PLATEAUの2023年度整備データをLOD0（建物フットプリント）としてポリゴンで収録したベクタータイル。建物の用途・構造等の属性を持つ。

**元データ**
- https://github.com/shiwaku/mlit-plateau-bldg-pmtiles

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[shiwaku (Yohei Shiwaku)](https://github.com/shiwaku)
