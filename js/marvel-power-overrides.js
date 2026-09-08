const OVERRIDES = {
  "nightcrawler:0": {
    name: "Bamf!",
    description: "Jako akcję dodatkową teleportujesz się na wolne pole, które widzisz, w odległości do 30 stóp. Masz 3 takie użycia i odzyskujesz je po długim odpoczynku. Po tej teleportacji zyskujesz odporność na wszystkie obrażenia do początku swojej następnej tury. Niezależnie od tego 3 razy na długi odpoczynek możesz podczas własnego ruchu teleportować się o 15 stóp na wolne pole, które widzisz; zużywa to 15 stóp twojego ruchu i nie wymaga osobnej akcji."
  },
  "nightcrawler:1": {
    name: "Chwytny ogon",
    description: "Możesz używać ogona do chwytania, przenoszenia i manipulowania lekkimi przedmiotami w swoim zasięgu. Możesz w ten sposób wykonać zwykłą interakcję z przedmiotem, np. otworzyć drzwi, podnieść klucz albo przytrzymać niewielki przedmiot. Ogon nie daje dodatkowej akcji, dodatkowej akcji dodatkowej ani dodatkowego ataku."
  },
  "humantorch:0": {
    name: "Płoń!",
    description: "Możesz otoczyć ciało płomieniami i korzystać z dwóch podstawowych efektów. Jako akcję wykonujesz dystansowy atak ogniem na cel do 120 stóp: premia do trafienia +6, a trafienie zadaje 2k10 obrażeń od ognia. Możesz też jako akcję rozpocząć lot: przez maksymalnie 10 minut masz szybkość lotu 60 stóp. Lot wymaga koncentracji i kończy się wcześniej, jeśli ją stracisz."
  },
  "photon:0": {
    name: "Żywe światło",
    description: "Jako akcję możesz wystrzelić skupioną energię świetlną. W wariancie precyzyjnym wybierasz cel do 60 stóp; wykonuje on rzut obronny na Zręczność ST 14, a przy porażce otrzymuje 2k8 obrażeń promienistych. W wariancie wiązki wykonujesz dystansowy atak mocą na cel do 120 stóp z premią +6; trafienie zadaje 4k6 obrażeń promienistych, a następny rzut ataku przeciw temu celowi przed końcem twojej następnej tury ma przewagę."
  },
  "wolverine:1": {
    name: "Pazury z adamantium",
    description: "Gdy aktywujesz bojowy szał, wysuwasz pazury z adamantium. Każdy atak pazurami ma premię +7 do trafienia i zadaje 1k6+6 obrażeń ciętych. Gdy w ramach Akcji Ataku wykonasz co najmniej jeden atak pazurami, raz w swojej turze możesz wykonać jeszcze jeden atak pazurami jako część tej samej akcji. Pazury są traktowane jak broń magiczna na potrzeby odporności przeciwników. W czasie szału masz również przewagę w testach i rzutach obronnych na Siłę, +2 do obrażeń ataków wręcz opartych na Sile oraz odporność na obrażenia obuchowe, kłute i cięte."
  },
  "namor:0": {
    name: "Fizjologia Atlantydy",
    description: "Dopóki jesteś przytomny, możesz wstrzymywać oddech bez ograniczenia czasu. Dzięki temu możesz przebywać pod wodą podczas eksploracji i walki bez konieczności wynurzania się po powietrze. Ta cecha nie daje niewrażliwości na inne zagrożenia środowiskowe, takie jak toksyczna woda, ekstremalne ciśnienie czy magiczne efekty."
  },
  "namor:1": {
    name: "Skrzydlate kostki",
    description: "Raz na długi odpoczynek możesz rozwinąć skrzydełka przy kostkach i zyskać szybkość lotu 30 stóp na 10 minut. Lot nie wymaga koncentracji. Jeśli efekt się skończy, gdy nadal jesteś w powietrzu i nic innego cię nie podtrzymuje, zaczynasz spadać zgodnie z normalnymi zasadami."
  },
  "jessicajones:0": {
    name: "Prywatna detektyw",
    description: "Jessica jest wyszkolona w prowadzeniu śledztw i odczytywaniu ludzi. Gdy analizujesz miejsce zdarzenia, łączysz wskazówki, szukasz ukrytych szczegółów lub próbujesz zrozumieć przebieg wydarzeń, korzystasz ze Śledztwa / Analizy. Gdy oceniasz emocje, motywacje, szczerość albo nietypowe zachowanie rozmówcy, korzystasz z Intuicji / Profilowania. Ta cecha nie daje osobnej premii poza wartościami zapisanymi na karcie, ale wskazuje główne zastosowanie tych umiejętności."
  },
  "jessicajones:1": {
    name: "Nadludzki skok",
    description: "Raz na turę, jeśli wcześniej w tej turze wykonałaś Sprint i masz miejsce na rozbieg, możesz przeskoczyć dodatkowe 10 stóp ponad zwykły dystans skoku. Ten dodatkowy dystans nie wymaga testu. Nadal musisz mieć wystarczająco dużo ruchu, aby pokonać cały dystans skoku, chyba że prowadzący zastosuje inną zasadę sceny."
  },
  "iceman:1": {
    name: "Lodowa ślizgawka",
    description: "Gdy używasz swojej mocy lotu na sobie, zamiast dosłownie lecieć tworzysz pod sobą stale narastającą lodową ślizgawkę. Mechanicznie masz szybkość lotu 60 stóp przez maksymalnie 10 minut i musisz utrzymywać koncentrację. Możesz poruszać się w dowolnym kierunku dozwolonym przez tę szybkość, a lód jest jedynie wizualnym opisem mocy i nie tworzy trwałego terenu ani osłony."
  },
  "mrfantastic:1": {
    name: "Kostium z niestabilnych molekuł",
    description: "Twój kostium dopasowuje się do każdej zmiany kształtu ciała. Nie ogranicza rozciągania kończyn, przeciskania się przez wąskie otwory ani zwiększania zasięgu ataków. Pancerz jest zintegrowany z kostiumem, nie nakłada dodatkowych kar za nadludzką elastyczność i nie może zostać zdjęty z ciebie wbrew twojej woli, gdy jesteś przytomny."
  },
  "beast:0": {
    name: "Mutantyczna zwinność",
    description: "W swojej turze możesz podwoić aktualną szybkość poruszania się do końca tej tury. Po użyciu tej zdolności nie możesz użyć jej ponownie, dopóki w jednej ze swoich tur nie wydasz 0 stóp ruchu. Masz również szybkość wspinaczki równą swojej zwykłej szybkości poruszania się i możesz wykorzystywać pazury do poruszania się po powierzchniach nadających się do wspinaczki."
  },
  "colossus:0": {
    name: "Organiczna stal",
    description: "Twoje ciało może przyjąć postać organicznej stali. Masz stałe +1 do KP. Masz przewagę w rzutach obronnych przeciw zatruciu, odporność na obrażenia od trucizny i niewrażliwość na choroby. Nie musisz jeść, pić ani oddychać. Podczas długiego odpoczynku pozostajesz świadomy otoczenia. Gdy jesteś w bojowym szale, twoje ataki bez broni są traktowane jak magiczne na potrzeby odporności przeciwników."
  },
  "colossus:1": {
    name: "Stalowa pięść",
    description: "Twój atak bez broni zadaje 1k8 obrażeń obuchowych zamiast normalnych obrażeń ataku bez broni. Podczas bojowego szału dodajesz +2 do obrażeń tych ataków, jeśli używasz Siły. Premia do trafienia i pozostałe modyfikatory są już uwzględnione w sekcji Ataki."
  },
  "strange:0": {
    name: "Peleryna Lewitacji",
    description: "Raz na długi odpoczynek możesz aktywować Pelerynę Lewitacji i zyskać szybkość lotu 30 stóp na 10 minut. Lot nie wymaga koncentracji. Możesz swobodnie zmieniać wysokość i kierunek ruchu w ramach swojej szybkości. Po zakończeniu efektu zaczynasz spadać, jeśli nadal jesteś w powietrzu i nic innego cię nie podtrzymuje."
  },
  "nova:0": {
    name: "Nova Force",
    description: "Po trafieniu przeciwnika atakiem bronią wręcz możesz zużyć komórkę mocy, aby wzmocnić uderzenie energią Nova Force: komórka 1. poziomu dodaje 2k8 obrażeń promienistych, a komórka 2. poziomu 3k8. Jako akcję możesz też wykonać dystansowy atak energią na cel do 120 stóp z premią +5; trafienie zadaje 4k6 obrażeń promienistych, a następny rzut ataku przeciw temu celowi przed końcem twojej następnej tury ma przewagę. Możesz również jako akcję unieść stworzenie lub przedmiot do 20 stóp w górę na maksymalnie 10 minut; niechętny cel wykonuje rzut obronny na Kondycję, a utrzymanie efektu wymaga koncentracji."
  },
  "ironfist:0": {
    name: "Żelazna Pięść",
    description: "Raz na krótki odpoczynek, gdy trafisz przeciwnika atakiem bez broni, możesz skupić chi w pięści. Trafienie zadaje dodatkowe 2k6 obrażeń od energii. Decyzję podejmujesz po trafieniu, więc nie tracisz użycia tej zdolności po nieudanym rzucie ataku."
  },
  "roguex:1": {
    name: "Pożyczona siła",
    description: "Jako akcję dodatkową możesz wejść w stan wzmocnionej siły na maksymalnie 1 minutę. Masz 3 użycia i odzyskujesz je po długim odpoczynku. W tym stanie masz przewagę w testach i rzutach obronnych na Siłę, +2 do obrażeń ataków wręcz wykorzystujących Siłę oraz odporność na obrażenia obuchowe, kłute i cięte. Jeśli masz wystarczająco dużo miejsca, możesz stać się Duża; wtedy twój zasięg ataków wręcz zwiększa się o 5 stóp."
  },
  "ironman:0": {
    name: "Lot repulsorowy",
    description: "Jako akcję dodatkową uruchamiasz repulsory w pancerzu i zyskujesz szybkość lotu 30 stóp na 10 minut. Masz 2 użycia tej mocy i odzyskujesz je po długim odpoczynku. Lot nie wymaga koncentracji."
  },
  "cyclops:0": {
    name: "Promień optyczny",
    description: "Promień optyczny jest twoim podstawowym atakiem dystansowym. Ma premię +8 do trafienia, zasięg 120/300 stóp i przy trafieniu zadaje 2k8+3 obrażeń od energii. Gdy wykonujesz Akcję Ataku, możesz wystrzelić promień dwa razy, rozpatrując każdy atak osobno. Premia +2 za wyszkolenie strzeleckie jest już uwzględniona w wartości +8."
  },
  "falcon:0": {
    name: "Skrzydła EXO-7",
    description: "Jako akcję dodatkową aktywujesz skrzydła EXO-7 i zyskujesz szybkość lotu 40 stóp na 10 minut. Masz 2 użycia tej zdolności i odzyskujesz je po długim odpoczynku."
  },
  "falcon:1": {
    name: "Redwing",
    description: "Raz na długi odpoczynek możesz jako akcję dodatkową skierować Redwinga do pomocy sojusznikowi znajdującemu się do 30 stóp od ciebie. Wybierasz konkretny test albo atak, przy którym dron pomaga; sojusznik otrzymuje przewagę zgodnie z normalnymi zasadami Pomocy. Dron nie wykonuje przy tym własnego ataku."
  },
  "x23:0": {
    name: "Pazury z adamantium",
    description: "Podczas bojowego szału wysuwasz pazury z adamantium. Każdy atak pazurami ma premię +6 do trafienia i zadaje 1k6+5 obrażeń ciętych. Gdy w ramach Akcji Ataku wykonasz co najmniej jeden atak pazurami, raz w swojej turze możesz wykonać jeszcze jeden atak pazurami jako część tej samej akcji. Pazury są traktowane jak broń magiczna na potrzeby odporności przeciwników."
  },
  "thing:0": {
    name: "Kamienna skóra",
    description: "Gdy otrzymujesz obrażenia, możesz użyć Reakcji i zmniejszyć je o 1k12+3. Masz 3 użycia tej zdolności i odzyskujesz je po długim odpoczynku. Redukcja działa na pojedyncze źródło obrażeń, które wywołało Reakcję. Twoje KP 15 i wysoka Kondycja są już uwzględnione w statystykach karty i nie wymagają dodatkowych modyfikacji."
  },
  "thing:1": {
    name: "Czas na łomot",
    description: "Twój atak bez broni zadaje 1k8 obrażeń obuchowych. Podczas bojowego szału dodajesz +2 do obrażeń tego ataku, jeśli używasz Siły. Premia do trafienia i końcowe obrażenia są już rozpisane w sekcji Ataki."
  },
  "cable:0": {
    name: "Ciało technoorganiczne",
    description: "Masz odporność na obrażenia psychiczne. Raz na długi odpoczynek, gdy otrzymujesz obrażenia od trucizny, obrażenia nekrotyczne albo psychiczne, możesz użyć Reakcji i zmniejszyć te obrażenia o 1k10+3. Redukcja dotyczy tylko jednego źródła obrażeń, które wywołało Reakcję."
  },
  "cable:1": {
    name: "Pole telekinetyczne",
    description: "Jako akcję dodatkową wybierasz stworzenie w odległości do 30 stóp. Cel wykonuje rzut obronny na Siłę ST 13. Przy porażce przesuwasz go o 5 stóp w swoją stronę albo od siebie. Raz na krótki odpoczynek możesz użyć tej mocy również na stworzeniu rozmiaru Dużego; wszystkie pozostałe zasady pozostają bez zmian."
  },
  "silversurfer:0": {
    name: "Kosmiczna Moc",
    description: "Jako akcję możesz wystrzelić skupioną energię: wykonujesz dystansowy atak mocą +6 na cel do 120 stóp, a trafienie zadaje 4k6 obrażeń promienistych i daje przewagę następnemu rzutowi ataku przeciw temu celowi przed końcem twojej następnej tury. Możesz też wystrzelić zimny promień na 60 stóp: atak +6, 2k8 obrażeń od zimna, a szybkość trafionego celu spada o 10 stóp do początku twojej następnej tury. Raz na długi odpoczynek możesz wywołać Kosmiczny Wybuch w punkcie do 150 stóp: stworzenia w promieniu 20 stóp wykonują rzut obronny na Zręczność ST 14, otrzymując 8k6 obrażeń promienistych przy porażce albo połowę przy sukcesie."
  },
  "silversurfer:1": {
    name: "Kosmiczna deska",
    description: "Jako akcję możesz rozpocząć lot na kosmicznej desce. Przez maksymalnie 10 minut masz szybkość lotu 60 stóp. Musisz utrzymywać koncentrację; utrata koncentracji kończy lot. Sama deska jest częścią opisu tej mocy i nie wymaga osobnego testu prowadzenia ani dodatkowej akcji do sterowania."
  },
  "loki:0": {
    name: "Iluzoryczna przemiana",
    description: "Jako akcję możesz zmienić wygląd własnego ciała, zachowując ten sam podstawowy układ kończyn. Możesz przybrać wygląd innej osoby o podobnej budowie. Niezależnie od tego możesz dowolnie zmieniać pozorny wygląd ubrania i noszonego wyposażenia, tworząc iluzoryczne przebranie. Te efekty zmieniają wygląd, ale nie dają fizycznych cech ani statystyk naśladowanej osoby. Fizyczne sprawdzenie iluzorycznego ubrania może ujawnić, że nie jest rzeczywiste."
  },
  "antman:0": {
    name: "Cząsteczki Pyma",
    description: "Gdy jesteś pomniejszony, twoje ciało i wyposażenie zmniejszają rozmiar razem z tobą. Możesz przeciskać się przez otwory o szerokości około 6 cali, jeśli prowadzący uzna, że kształt przejścia na to pozwala. Twoja nośność nie zmniejsza się wyłącznie z powodu pomniejszenia, więc nadal możesz przenosić ciężary zgodnie z normalną wartością Siły."
  },
  "spiderman:1": {
    name: "Pajęczy zmysł",
    description: "Dodajesz +5 do inicjatywy. Dopóki jesteś przytomny, nie możesz zostać zaskoczony. Niewidoczni napastnicy nie otrzymują przewagi w atakach przeciwko tobie wyłącznie dlatego, że ich nie widzisz. Wykrywanie nietypowego ruchu, pułapek i nadchodzącego zagrożenia rozstrzygasz testem Percepcji / Czujności albo wartością pasywną tej umiejętności."
  },
  "msmarvel:0": {
    name: "Powiększenie kończyn",
    description: "Raz na długi odpoczynek możesz jako akcję dodatkową powiększyć i wydłużyć kończyny na 1 minutę. W tym czasie twoje ataki bez broni mają zasięg 10 stóp. Efekt nie zwiększa automatycznie obrażeń ani twojego rozmiaru i nie wpływa na zasięg innych ataków."
  },
  "firestar:1": {
    name: "Lot termiczny",
    description: "Jako akcję możesz rozpocząć lot, unosząc się na kontrolowanym strumieniu energii cieplnej. Przez maksymalnie 10 minut masz szybkość lotu 60 stóp. Musisz utrzymywać koncentrację; jej utrata natychmiast kończy lot."
  },
  "katebishop:1": {
    name: "Szkolenie Young Avengers",
    description: "Masz 4 kości manewrów k8 i odzyskujesz wszystkie po krótkim lub długim odpoczynku. ST rzutu obronnego przeciw twoim manewrom wynosi 14. Możesz wydawać te kości na opisane na karcie techniki łucznicze: po trafieniu dodać k8 obrażeń i spróbować powalić Duży lub mniejszy cel po nieudanym rzucie na Siłę ST 14; dodać k8 do rzutu ataku po zobaczeniu wyniku na k20; albo zamienić się miejscami z sojusznikiem w 5 stóp i dodać wynik k8 do KP jednego z was do początku twojej następnej tury."
  },
  "warmachine:1": {
    name: "Działo naramienne",
    description: "Raz na długi odpoczynek możesz jako akcję wystrzelić salwę z działa naramiennego w stożku długości 15 stóp. Każde stworzenie w obszarze wykonuje rzut obronny na Zręczność ST 14. Przy porażce otrzymuje 4k6 obrażeń od ognia, a przy sukcesie połowę tej wartości."
  },
  "gambit:0": {
    name: "Naładowane karty",
    description: "Naładowana karta jest specjalną bronią miotaną. Ma premię +7 do trafienia, zasięg 30/90 stóp i przy trafieniu zadaje 1k6+6 obrażeń od energii. Po walce zużyte karty wracają do twojej puli amunicji. Ataki kartami mogą korzystać z twoich technik manewrowych tak samo jak inne ataki bronią."
  },
  "gambit:1": {
    name: "Ładunek kinetyczny",
    description: "Raz na turę, gdy trafisz przeciwnika naładowaną kartą, możesz wzmocnić eksplozję energii. Obrażenia ataku są traktowane jako obrażenia od energii i zwiększają się o 1k4. Nie wymaga to dodatkowej akcji."
  },
  "starlord:0": {
    name: "Buty odrzutowe",
    description: "Jako akcję dodatkową aktywujesz buty odrzutowe i zyskujesz szybkość lotu 30 stóp na 10 minut. Masz 2 użycia tej zdolności i odzyskujesz je po długim odpoczynku."
  },
  "quicksilver:0": {
    name: "Superszybkość",
    description: "Twoja zwykła szybkość poruszania się wynosi 45 stóp, a do inicjatywy dodajesz dodatkowe +3. Trzy razy na długi odpoczynek możesz jako akcję dodatkową przemieścić się o 15 stóp bez prowokowania ataków okazyjnych. Możesz też wydać 1 punkt skupienia, aby jako akcję dodatkową wykonać Sprint albo Odskok; jeśli wybierzesz Sprint, do końca tury podwajasz również dystans skoków."
  },
  "quicksilver:1": {
    name: "Błyskawiczna seria",
    description: "Raz na krótki odpoczynek, gdy wydasz 1 punkt skupienia, aby po Akcji Ataku wykonać dwa dodatkowe ataki bez broni jako akcję dodatkową, możesz w ramach tej samej akcji dodatkowej wykonać jeszcze jeden atak bez broni. Każdy atak rozpatrujesz osobno."
  },
  "shehulk:1": {
    name: "Pewność siebie prawniczki",
    description: "Jennifer potrafi wykorzystywać wiedzę, pewność siebie i doświadczenie śledcze poza walką. Do analizowania dokumentów, niespójności, dowodów i przebiegu zdarzeń korzystasz ze Śledztwa / Analizy. Do wystąpień, argumentacji i negocjacji korzystasz z odpowiedniej umiejętności społecznej zapisanej na karcie. Ta cecha nie daje dodatkowej premii poza normalnymi wartościami umiejętności."
  },
  "invisiblewoman:1": {
    name: "Specjalistka od niewidzialności",
    description: "Raz na długi odpoczynek możesz bez zużywania komórki mocy uczynić dotknięte stworzenie niewidzialnym na maksymalnie 1 godzinę. Efekt wymaga koncentracji. Kończy się wcześniej, jeśli niewidzialna postać zaatakuje albo użyje ofensywnej mocy. Możesz również używać tej samej mocy normalnie, zużywając odpowiednią komórkę mocy, jeśli masz ją dostępną."
  },
  "magik:0": {
    name: "Dyski teleportacyjne",
    description: "Teleportacja Magik zawsze przebiega przez Limbo. Jako akcję dodatkową możesz teleportować się na wolne pole, które widzisz, w odległości do 30 stóp. Masz 3 takie użycia i odzyskujesz je po długim odpoczynku; po każdym z nich zyskujesz odporność na wszystkie obrażenia do początku swojej następnej tury. Masz także jedno dodatkowe darmowe użycie teleportacji na 30 stóp na długi odpoczynek. Zużywając komórkę mocy 3. poziomu możesz jako akcję teleportować się o 90 stóp i zabrać ze sobą jednego chętnego sojusznika znajdującego się do 5 stóp; stworzenia w promieniu 10 stóp od miejsca, z którego znikasz, otrzymują 3k10 obrażeń od grzmotu po nieudanym rzucie obronnym na Kondycję albo połowę przy sukcesie."
  },
  "magik:1": {
    name: "Miecz Duszy",
    description: "Miecz Duszy jest magicznym długim mieczem związanym z tobą. Do rzutów ataku i obrażeń używasz Charyzmy zamiast Siły lub Zręczności. Broń daje dodatkowe +1 do trafienia i obrażeń, więc jej premia do trafienia wynosi +7, a pojedynczy cios zadaje 1k8+4 obrażeń od energii. Gdy wykonujesz Akcję Ataku, możesz zaatakować Mieczem Duszy dwa razy. Raz na turę po trafieniu możesz zużyć jedną komórkę mocy 3. poziomu, aby zadać dodatkowe 4k8 obrażeń od energii i przewrócić cel rozmiaru Ogromnego lub mniejszego."
  },
  "magik:2": {
    name: "Rozcinanie magii",
    description: "Mieczem Duszy możesz przecinać działającą magię. Gdy widzisz w odległości do 60 stóp istotę używającą mocy lub zaklęcia, możesz użyć Reakcji i zużyć komórkę mocy 3. poziomu, aby przerwać efekt. Moc 3. poziomu lub niższego zostaje przerwana automatycznie; przy silniejszym efekcie wykonujesz test Charyzmy przeciw ST 10 + poziom mocy. Możesz też jako akcję zużyć komórkę mocy 3. poziomu i wybrać stworzenie, przedmiot albo efekt magiczny do 120 stóp; efekty 3. poziomu lub niższego kończą się automatycznie, a przy silniejszych wykonujesz test Charyzmy przeciw ST 10 + poziom efektu."
  },
  "magik:3": {
    name: "Pancerz Limbo",
    description: "Przywołany pancerz daje ci KP 17. Niezależnie od tego możesz zużyć komórkę mocy 3. poziomu, aby otoczyć się ochronną energią Limbo: otrzymujesz 15 tymczasowych PW. Dopóki masz choć część tych tymczasowych PW, każde stworzenie, które trafi cię atakiem wręcz z odległości 5 stóp, otrzymuje 15 obrażeń od zimna. Efekt kończy się po 1 godzinie albo gdy stracisz wszystkie przyznane tymczasowe PW."
  },
  "magik:4": {
    name: "Darkchylde",
    description: "Jako akcję dodatkową wybierasz przeciwnika, którego widzisz, w odległości do 30 stóp. Przez 1 minutę wobec tego celu ujawnia się demoniczna strona Illyany: dodajesz +3 do każdego rzutu obrażeń przeciw niemu, a twoje rzuty ataku przeciw temu celowi są trafieniami krytycznymi przy wyniku 19 lub 20 na k20. Jeśli cel umrze podczas działania efektu, odzyskujesz 8 PW. Masz jedno użycie i odzyskujesz je po krótkim lub długim odpoczynku."
  },
  "groot:0": {
    name: "Jestem Groot",
    description: "Podczas swojej tury twój zasięg ataków wręcz zwiększa się o 5 stóp dzięki wydłużającym się gałęziom. Raz na długi odpoczynek możesz jako akcję powiększyć się na maksymalnie 1 minutę bez konieczności utrzymywania koncentracji: jeśli masz miejsce, zwiększasz rozmiar o jedną kategorię, masz przewagę w testach i rzutach obronnych na Siłę, a ataki bronią i naturalne ataki zadają dodatkowe 1k4 obrażeń."
  },
  "storm:0": {
    name: "Kontrola pogody",
    description: "Raz na turę, gdy twoja moc zada obrażenia od elektryczności albo grzmotu, możesz przesunąć jeden trafiony cel o 5 stóp w wybranym kierunku, jeśli efekt nie mówi inaczej. Raz na długi odpoczynek możesz bez zużywania komórki mocy przywołać burzę na maksymalnie 10 minut, wymagającą koncentracji. W każdej swojej turze możesz jako akcję skierować piorun w punkt pod chmurą; stworzenia w promieniu 5 stóp wykonują rzut obronny na Zręczność, otrzymując 3k10 obrażeń od elektryczności przy porażce albo połowę przy sukcesie."
  },
  "storm:1": {
    name: "Jeźdźczyni wiatru",
    description: "Jako akcję możesz wznieść się na kontrolowanych prądach powietrza. Przez maksymalnie 10 minut masz szybkość lotu 60 stóp. Musisz utrzymywać koncentrację; jej utrata kończy lot."
  },
  "lukecage:0": {
    name: "Kuloodporna skóra",
    description: "Gdy otrzymujesz obrażenia, możesz użyć Reakcji i zmniejszyć je o 1k12+3. Masz 3 użycia tej zdolności i odzyskujesz je po długim odpoczynku. Redukcja dotyczy jednego źródła obrażeń, które wywołało Reakcję."
  },
  "lukecage:1": {
    name: "Uliczny zabijaka",
    description: "Twój atak bez broni zadaje 1k8+4 obrażeń obuchowych i ma premię +7 do trafienia. Jeśli na początku swojej tury nie trzymasz broni ani tarczy, ta wartość zastępuje normalne obrażenia ataku bez broni."
  },
  "venom:0": {
    name: "Symbiont",
    description: "Masz przewagę w testach Atletyki / Sprawności używanych do pochwycenia przeciwnika lub utrzymania chwytu. Gdy masz przeciwnika pochwyconego, raz na turę możesz jako akcję dodatkową ugryźć go: wykonujesz atak wręcz z premią +6, a trafienie zadaje 1k8+5 obrażeń kłutych podczas bojowego szału."
  },
  "hulk:0": {
    name: "Hulk miażdży!",
    description: "Twój podstawowy potężny cios ma premię +7 do trafienia. Po trafieniu zadaje 2k6+4 obrażeń obuchowych, a podczas bojowego szału 2k6+6. Gdy wykonujesz Akcję Ataku, możesz wykonać dwa takie ciosy zamiast jednego; każdy wymaga osobnego rzutu ataku."
  },
  "hulk:1": {
    name: "Skok gamma",
    description: "Jeśli przed skokiem masz co najmniej 10 stóp rozbiegu, potrajasz normalny dystans skoku w dal i skoku wzwyż. Nadal musisz mieć wystarczająco dużo ruchu, aby pokonać dystans skoku, chyba że prowadzący zastosuje inną zasadę sceny."
  },
  "psylocke:0": {
    name: "Psychiczne ostrze",
    description: "Tworzysz ostrze czystej energii psychicznej. Atak ma premię +6 do trafienia i zadaje 1k8+3 obrażeń psychicznych. Ostrze jest traktowane jak broń magiczna. Gdy wykonujesz Akcję Ataku, możesz zaatakować nim dwa razy. Jeśli w tej samej turze wykonasz nim co najmniej jeden atak i nie trzymasz tarczy, możesz otrzymać +2 do KP do początku swojej następnej tury, jeśli spełniasz warunki swojej techniki obronnej."
  },
  "psylocke:1": {
    name: "Psychiczne skupienie",
    description: "Raz na krótki odpoczynek, gdy nie zdasz rzutu obronnego na Mądrość, Inteligencję albo Charyzmę, możesz rzucić 1k6 i dodać wynik do tego rzutu obronnego. Jeśli po dodaniu wyniku osiągniesz wymagane ST, rzut staje się sukcesem."
  },
  "captainmarvel:0": {
    name: "Energia Binary",
    description: "Jako akcję możesz wystrzelić skupioną wiązkę promienistej energii na cel do 120 stóp: wykonujesz dystansowy atak mocą +6, a trafienie zadaje 4k6 obrażeń promienistych; następny rzut ataku przeciw temu celowi przed końcem twojej następnej tury ma przewagę. Możesz też wystrzelić szybszy pocisk energii na zasięg 240 stóp: atak +6, 2k10 obrażeń od ognia."
  },
  "captainmarvel:1": {
    name: "Lot fotonowy",
    description: "Jako akcję możesz rozpocząć lot i przez maksymalnie 10 minut mieć szybkość lotu 60 stóp. Lot wymaga koncentracji. Raz na krótki odpoczynek, gdy aktywujesz tę moc na sobie, natychmiast otrzymujesz 5 tymczasowych PW."
  },
  "americachavez:0": {
    name: "Gwiezdny portal",
    description: "Jako akcję dodatkową teleportujesz się na wolne pole, które widzisz, w odległości do 30 stóp. Raz na długi odpoczynek możesz podczas tej teleportacji zabrać ze sobą jednego chętnego sojusznika znajdującego się do 5 stóp od ciebie; oboje pojawiacie się na wolnych polach obok siebie w zasięgu teleportacji."
  },
  "americachavez:1": {
    name: "Międzywymiarowy cios",
    description: "Raz na krótki odpoczynek, gdy trafisz przeciwnika atakiem bez broni, możesz nasycić cios energią wymiarową. Trafienie zadaje dodatkowe 2k6 obrażeń od energii. Decyzję podejmujesz po trafieniu, więc nie tracisz użycia po nieudanym rzucie ataku."
  }
};

export function applyMarvelPowerOverrides(character) {
  if (!character?.marvel) return character;
  character.marvel = character.marvel.map((entry, index) => {
    const override = OVERRIDES[`${character.id}:${index}`];
    if (!override) return entry;
    return [override.name, override.description];
  });
  return character;
}
