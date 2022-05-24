// Please remove this line and the empty one after it

import SwiftUI

enum HomeScreenUIConstants {
    static let sectionSpacing = 32.0
    static let homeScreenHorizontalPadding = 8.0
    static let cardsSpacing = 16.0
}

enum HomeScreenSection {
    case yourData
    case dataKnowHow
    case tools
}

struct Card: Identifiable {
    let id = UUID()
    let title: String
    let description: String
    let imageName: String
    let backgroundColorHex: String
}

struct HomeScreenSectionModel {
    let title: String
    let cards: [Card]
    let type: HomeScreenSection
}

struct Sizes {
    let screenSize: CGSize
    let containerWidth: CGFloat
    let smallTileWidth: CGFloat
    let mediumTileWidth: CGFloat
    let bigTileWidth: CGFloat
}

struct HomeScreenSizesKey: EnvironmentKey {
    typealias Value = Sizes
    static let defaultValue: Sizes = Sizes(screenSize: .zero, containerWidth: .zero, smallTileWidth: .zero, mediumTileWidth: .zero, bigTileWidth: .zero)
}

extension EnvironmentValues {
  var homeScreenTileSizes: Sizes {
    get { self[HomeScreenSizesKey.self] }
    set { self[HomeScreenSizesKey.self] = newValue }
  }
}

struct HomeScreenView: View {
    
    var sections: [HomeScreenSectionModel] = [
        .init(title: "Your Data",
              cards: [
                .init(title: "polyExplorer",
                      description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
                      imageName: "heart.fill",
                      backgroundColorHex: "#475abb"),
                .init(title: "Big big many big hello there",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "Amazon Importer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c")
              ],
              type: .yourData),
        
            .init(title: "Data KnowHow",
                  cards: [
                    .init(title: "polyExplorer",
                          description: "nada",
                          imageName: "heart.fill",
                          backgroundColorHex: "#0c1a3c"),
                    .init(title: "polyExplorer",
                          description: "nada",
                          imageName: "heart.fill",
                          backgroundColorHex: "#0c1a3c"),
                    .init(title: "polyExplorer",
                          description: "nada",
                          imageName: "heart.fill",
                          backgroundColorHex: "#0c1a3c"),
                    .init(title: "polyExplorer",
                          description: "nada",
                          imageName: "heart.fill",
                          backgroundColorHex: "#0c1a3c"),
                    .init(title: "polyExplorer",
                          description: "nada",
                          imageName: "heart.fill",
                          backgroundColorHex: "#0c1a3c")
                  ],
                  type: .dataKnowHow),
        .init(title: "Toolz",
              cards: [
                .init(title: "Sed ut perspiciatis, unde omnis iste",
                      description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "Sed ut perspiciatis, unde omnis iste",
                      description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
                .init(title: "polyExplorer",
                      description: "nada",
                      imageName: "heart.fill",
                      backgroundColorHex: "#0c1a3c"),
              ],
              type: .tools),
    ]
    
    let footerModel = FooterViewModel(title: "Like what you have seen?",
                                      description: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
                                      imageName: "FacebookImport",
                                      backgoundHex: "#fed7d6",
                                      buttonTitle: "Learn more",
                                      buttonBackgroundHex: "#0f1938")
    
    var body: some View {
        // Why GeometryReader needs to be on top?
        GeometryReader { geo in
            let screenWidth = geo.size.width
            let containerWidth = screenWidth - 2 * HomeScreenUIConstants.homeScreenHorizontalPadding
            let smallTileWidth = (containerWidth - 2 * HomeScreenUIConstants.cardsSpacing) / 3
            let bigTileWidth = containerWidth - smallTileWidth - HomeScreenUIConstants.cardsSpacing
            
            ScrollView(showsIndicators: false) {
                ForEach(sections, id: \.type) { sectionModel in
                    switch sectionModel.type {
                    case .yourData:
                        MyDataSectionView(sectionModel: sectionModel)
                    case .dataKnowHow:
                        DataKnowHowSectionView(sectionModel: sectionModel)
                    case .tools:
                        ToolsSectionView(sectionModel: sectionModel)
                    }
                    Spacer(minLength: HomeScreenUIConstants.sectionSpacing)
                }
                FooterView(model: footerModel)
            }
            .padding([.leading, .trailing], HomeScreenUIConstants.homeScreenHorizontalPadding)
            .environment(\.homeScreenTileSizes, Sizes.init(screenSize: geo.size, containerWidth: containerWidth, smallTileWidth: smallTileWidth, mediumTileWidth: containerWidth, bigTileWidth: bigTileWidth))
        }
    }
}

struct MyDataSectionView: View {
    var sectionModel: HomeScreenSectionModel
    
    var body: some View {
        VStack(alignment: .leading, spacing: HomeScreenUIConstants.cardsSpacing) {
            Text(sectionModel.title).fontWeight(.bold)
            ForEach(Array(sectionModel.cards.chunked(into: 3).enumerated()), id: \.offset) { index, chunk in
                switch index % 4 {
                case 0:
                    LargeLeftContainerView(cards: chunk)
                case 1:
                    RowContainerView(cards: chunk)
                case 2:
                    LargeRightContainerView(cards: chunk)
                case 3:
                    RowContainerView(cards: chunk)
                default:
                    Color.clear
                }
            }
        }
    }
}

struct DataKnowHowSectionView: View {
    let sectionModel: HomeScreenSectionModel

    var body: some View {
        VStack(alignment: .leading) {
            Text(sectionModel.title).fontWeight(.bold)
            VStack(alignment: .leading, spacing: HomeScreenUIConstants.cardsSpacing) {
                ForEach(Array(sectionModel.cards.chunked(into: 3).enumerated()), id: \.offset) { _, chunk in
                    RowContainerView(cards: chunk)
                }
            }
        }
    }
}

struct ToolsSectionView: View {
    let sectionModel: HomeScreenSectionModel

    var body: some View {
        VStack(alignment: .leading) {
            Text(sectionModel.title).fontWeight(.bold)
            VStack(alignment: .leading, spacing: HomeScreenUIConstants.cardsSpacing) {
                ForEach(sectionModel.cards) { card in
                    MediumCardView(card: card)
                }
            }
        }
    }
}

struct FooterViewModel {
    let title: String
    let description: String
    let imageName: String
    let backgoundHex: String
    let buttonTitle: String
    let buttonBackgroundHex: String
}

struct FooterView: View {
    let model: FooterViewModel
    
    enum Constants {
        static let verticalSpacing = 16.0
        static let padding = 32.0
        static let cornerRadius = 8.0
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: Constants.verticalSpacing) {
            Text(model.title).fontWeight(.bold)
            Text(model.description)
            Image(model.imageName)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(alignment: .center)
            Button(model.buttonTitle) {
                //TODO
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .center)
            .foregroundColor(Color(fromHex: model.buttonBackgroundHex).isLight ? .black : .white)
            .background(Color(fromHex: model.buttonBackgroundHex))
            .cornerRadius(Constants.cornerRadius)
                
        }
        .padding(Constants.padding)
        .background(Color(fromHex: model.backgoundHex))
        .cornerRadius(Constants.cornerRadius)
    }
}

struct LargeLeftContainerView: View {
    let cards: [Card]
    
    var body: some View {
        HStack(alignment: .top, spacing: HomeScreenUIConstants.cardsSpacing) {
            BigCardView(card: cards.first!)
            VStack(spacing: HomeScreenUIConstants.cardsSpacing) {
                ForEach(Array(cards.dropFirst())) { card in
                    SmallCardView(card: card)
                }
            }
        }
    }
}

struct LargeRightContainerView: View {
    let cards: [Card]
    var body: some View {
        HStack(spacing: HomeScreenUIConstants.cardsSpacing) {
            if cards.count <= 2 {
                ForEach(cards) { card in
                    SmallCardView(card: card)
                }
            } else {
                VStack(spacing: HomeScreenUIConstants.cardsSpacing) {
                    ForEach(Array(cards.prefix(2))) { card in
                        SmallCardView(card: card)
                    }
                }
                BigCardView(card: cards.last!)
            }
        }
    }
}

struct RowContainerView: View {
    let cards: [Card]
    var body: some View {
        HStack(alignment: .top, spacing: HomeScreenUIConstants.cardsSpacing) {
            ForEach(cards) { card in
                SmallCardView(card: card)
            }
        }
    }
}

struct BigCardView: View {
    enum Constants {
        static let verticalSpacing = 8.0
        static let padding = 8.0
        static let cornerRadius = 8.0
    }

    private let card: Card
    private let backgroundColor: Color
    @Environment(\.homeScreenTileSizes) var sizes
    
    init(card: Card) {
        self.card = card
        self.backgroundColor = Color(fromHex: card.backgroundColorHex)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: Constants.verticalSpacing) {
            Image("FacebookImport")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .foregroundColor(backgroundColor.isLight ? .black : .white)
                .frame(width: sizes.bigTileWidth - 2 * Constants.padding, alignment: .center)
            
            VStack(alignment: .leading, spacing: Constants.verticalSpacing) {
                Text(card.title)
                    .foregroundColor(backgroundColor.isLight ? .black : .white)
                    .fontWeight(.bold)
                Text(card.description)
                    .foregroundColor(backgroundColor.isLight ? .black : .white)
            }
        }
        .padding(Constants.padding)
        .frame(width: sizes.bigTileWidth,
               height: sizes.bigTileWidth)
        .background(backgroundColor)
        .cornerRadius(Constants.cornerRadius)
    }
}

struct MediumCardView: View {
    enum Constants {
        static let verticalSpacing = 16.0
        static let horizontalSpacing = 8.0
        static let padding = 8.0
        static let cornerRadius = 8.0
    }

    private let card: Card
    private let backgroundColor: Color
    @Environment(\.homeScreenTileSizes) var sizes
    
    init(card: Card) {
        self.card = card
        self.backgroundColor = Color(fromHex: card.backgroundColorHex)
    }

    var body: some View {
        HStack(spacing: Constants.horizontalSpacing) {
            Image("FacebookImport")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .foregroundColor(backgroundColor.isLight ? .black : .white)
                .frame(width: sizes.smallTileWidth, height: sizes.smallTileWidth, alignment: .center)
            
            VStack(alignment: .leading, spacing: Constants.verticalSpacing) {
                Text(card.title)
                    .foregroundColor(backgroundColor.isLight ? .black : .white)
                    .fontWeight(.bold)
                Text(card.description)
                    .foregroundColor(backgroundColor.isLight ? .black : .white)
            }
            Spacer()
        }
        .padding(Constants.padding)
        .frame(width: sizes.mediumTileWidth, height: sizes.smallTileWidth)
        .background(backgroundColor)
        .cornerRadius(Constants.cornerRadius)
    }
}

struct SmallCardView: View {
    enum Constants {
        static let verticalSpacing = 8.0
        static let padding = 8.0
        static let cornerRadius = 8.0
    }

    private let card: Card
    private let backgroundColor: Color
    @Environment(\.homeScreenTileSizes) var sizes
    
    init(card: Card) {
        self.card = card
        self.backgroundColor = Color(fromHex: card.backgroundColorHex)
    }

    var body: some View {
        VStack(alignment: .center, spacing: Constants.verticalSpacing) {
            Image("FacebookImport")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .foregroundColor(backgroundColor.isLight ? .black : .white)
            Text(card.title)
                .foregroundColor(backgroundColor.isLight ? .black : .white)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)
        }
        .padding(Constants.padding)
        .frame(width: sizes.smallTileWidth, height: sizes.smallTileWidth)
        .background(backgroundColor)
        .cornerRadius(Constants.cornerRadius)
    }
}


struct HomeScreenView_Previews: PreviewProvider {
    static var previews: some View {
        HomeScreenView()
    }
}

extension Array {
    func chunked(into size: Int) -> [[Element]] {
        return stride(from: 0, to: count, by: size).map {
            Array(self[$0 ..< Swift.min($0 + size, count)])
        }
    }
}
