# import osmium
# import networkx as nx
# import matplotlib.pyplot as plt
# from shapely.geometry import LineString
# import numpy as np

# class RoadHandler(osmium.SimpleHandler):
#     def __init__(self):
#         osmium.SimpleHandler.__init__(self)
#         self.roads = []

#     def way(self, w):
#         if 'highway' in w.tags:
#             coords = []
#             for n in w.nodes:
#                 try:
#                     coords.append((n.lon, n.lat))
#                 except osmium.InvalidLocationError:
#                     # Skip nodes with invalid locations
#                     continue
#             if len(coords) >= 2:
#                 self.roads.append(LineString(coords))

# def create_heatmap(osm_file, output_file):
#     # Parse OSM data
#     handler = RoadHandler()
#     handler.apply_file(osm_file)

#     # Create graph
#     G = nx.Graph()
#     for road in handler.roads:
#         coords = list(road.coords)
#         for i in range(len(coords) - 1):
#             G.add_edge(coords[i], coords[i+1])

#     if len(G.nodes) == 0:
#         print("No valid road data found in the OSM file.")
#         return

#     # Prepare data for heatmap
#     x, y = zip(*G.nodes())
#     edge_density = nx.edge_density(G)

#     # Create heatmap
#     plt.figure(figsize=(12, 8))
#     plt.hexbin(x, y, gridsize=20, cmap='YlOrRd')
#     plt.colorbar(label='Road Density')
#     plt.title(f'Road Network Heatmap (Edge Density: {edge_density:.4f})')
#     plt.xlabel('Longitude')
#     plt.ylabel('Latitude')

#     # Save as PNG
#     plt.savefig(output_file, dpi=300, bbox_inches='tight')
#     plt.close()

#     print(f"Heatmap saved as {output_file}")



import osmium
import networkx as nx
import matplotlib.pyplot as plt
from shapely.geometry import LineString
import numpy as np

class RoadHandler(osmium.SimpleHandler):
    def __init__(self):
        osmium.SimpleHandler.__init__(self)
        self.roads = []

    def way(self, w):
        if 'highway' in w.tags:
            coords = []
            for n in w.nodes:
                try:
                    coords.append((n.lon, n.lat))
                except osmium.InvalidLocationError:
                    continue
            if len(coords) >= 2:
                self.roads.append(LineString(coords))

def create_random_heatmap(output_file):
    # Generate random data
    np.random.seed(42)  # for reproducibility
    x = np.random.randn(1000)
    y = np.random.randn(1000)

    # Create heatmap
    plt.figure(figsize=(12, 8))
    plt.hexbin(x, y, gridsize=20, cmap='YlOrRd')
    plt.colorbar(label='Density')
    plt.title('Random Heatmap')
    plt.xlabel('X')
    plt.ylabel('Y')

    # Save as PNG
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close()

    print(f"Random heatmap saved as {output_file}")

def create_heatmap(osm_file, output_file):
    # Parse OSM data
    handler = RoadHandler()
    handler.apply_file(osm_file)

    # Create graph
    G = nx.Graph()
    for road in handler.roads:
        coords = list(road.coords)
        for i in range(len(coords) - 1):
            G.add_edge(coords[i], coords[i+1])

    if len(G.nodes) == 0:
        print("No valid road data found in the OSM file. Creating a random heatmap instead.")
        create_random_heatmap(output_file)
        return

    # Prepare data for heatmap
    x, y = zip(*G.nodes())
    edge_density = nx.edge_density(G)

    # Create heatmap
    plt.figure(figsize=(12, 8))
    plt.hexbin(x, y, gridsize=20, cmap='YlOrRd')
    plt.colorbar(label='Road Density')
    plt.title(f'Road Network Heatmap (Edge Density: {edge_density:.4f})')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')

    # Save as PNG
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close()

    print(f"Road network heatmap saved as {output_file}")

# Usage
osm_file = r"V:/21BECE30316/ISRO HACKS/map.osm"
output_file = 'road_network_heatmap.png'
create_heatmap(osm_file, output_file)