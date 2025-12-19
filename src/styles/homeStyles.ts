import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 45,
    marginBottom: 10,
  },

  profileImg: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 15,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    fontSize: 13,
    color: "gray",
    marginLeft: 4,
  },

  greetingText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },

  bell: {
    fontSize: 22,
    marginLeft: "auto",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 6,
  },

  filterButton: {
    backgroundColor: "#0A7A47",
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
  },

  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: "#0A7A47",
  },

  categoryText: {
    fontSize: 14,
  },

  categoryTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    elevation: 3,
  },

  cardImg: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },

  cardSub: {
    fontSize: 12,
    color: "gray",
  },

  priceRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
  },

  addBtn: {
    width: 28,
    height: 28,
    backgroundColor: "#0A7A47",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "white",
    fontSize: 18,
  },
});
