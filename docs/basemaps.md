# ベースマップ詳細

Kepler.glで利用可能なベースマップスタイル。各リソースはJSON形式で配信。

## 利用手順

1. 読み込みしたいベースマップのURLをコピー
2. Kepler.gl を開く
3. 「Base map / ベースマップ」タブを開く
4. 「Add Map Style / マップスタイル追加」をクリック
5. 「1. Paste style url / スタイルのURLをペースト」にコピーしたURLをペースト
6. 「3. Name your style / スタイルの名称を設定」に名称を入力
7. 緑色の「Add Style / スタイル追加」をクリック

---

## 地理院地図

### 地理院標準地図

**URL**

`https://raw.githubusercontent.com/amane-ltd/keplergl-resources/refs/heads/main/basemaps/std_vector.json`

**概要**

地理院タイル（標準地図）のラスタータイルを背景に用いたベースマップ。道路・建物・注記など豊富な地物情報を含むフルカラーの地図で、標高タイルによる地形陰影（3D表現）を重ねている。地理的コンテキストの把握に適する。

**元データ**
- [地理院タイル一覧](https://maps.gsi.go.jp/development/ichiran.html)
- [産業技術総合研究所シームレス標高タイル](https://gsj-seamless.jp/seamless/elev/)（地形表現）

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)

### 地理院淡色地図

**URL**

`https://raw.githubusercontent.com/amane-ltd/keplergl-resources/refs/heads/main/basemaps/pale_vector.json`

**概要**

地理院タイル（淡色地図）のラスタータイルを背景に用いたベースマップ。標準地図より色味を抑えた配色で、標高タイルによる地形陰影（3D表現）を重ねている。重ね合わせるデータの視認性を高めた地図。

**元データ**
- [地理院タイル一覧](https://maps.gsi.go.jp/development/ichiran.html)
- [産業技術総合研究所シームレス標高タイル](https://gsj-seamless.jp/seamless/elev/)（地形表現）

**ライセンス**
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)

### 地理院白地図

**URL**

`https://raw.githubusercontent.com/amane-ltd/keplergl-resources/refs/heads/main/basemaps/blank_vector.json`

**概要**

主張の少ないモノトーンの白系ベースマップ。背景にMIERUNE Monoのラスタータイル（OpenStreetMapベース）を用い、その上に地理院地図Vectorの地物と、標高タイルによる地形陰影（3D表現）を重ねている。データ可視化の背景として最も主張の少ない地図。

**元データ**
- [MIERUNE Mono](https://mierune.github.io/tiles/)（背景タイル）
- [地理院地図Vector](https://maps.gsi.go.jp/vector/)（地物）
- [産業技術総合研究所シームレス標高タイル](https://gsj-seamless.jp/seamless/elev/)（地形表現）

**ライセンス**
- 背景タイル: MIERUNE Inc. © OpenMapTiles © OpenStreetMap contributors（[CC BY](https://creativecommons.org/licenses/by/4.0/) / [ODbL](https://opendatacommons.org/licenses/odbl/)）
- 地物・地形: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

**配布元**
[株式会社AMANE](https://amane.ltd/)

