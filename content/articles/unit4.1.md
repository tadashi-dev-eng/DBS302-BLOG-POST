---
title: Cassandra Data model
---
## Cassandra Data Model Structure

- The outermost structure is a cluster containing nodes, which hold key spaces.
- Key spaces contain tables, tables contain rows, and rows contain columns organized into partitions based on partition keys.

## Data Organization and Partitioning

- Data is stored in partitions, each consisting of multiple columns and assigned to nodes based on the hash of the partition key.
- The primary key includes a partition key and clustering columns, determining data distribution and order within partitions.

## Data Types and Terminology

- Columns are name-value pairs; rows group columns identified by a primary key.
- Supported data types align with Java types, including integers, floats, text, UUIDs, Booleans, blobs, and specialized types like counters and IP addresses.

- The partition key in Cassandra's data model plays a crucial role in data distribution and storage:

    1. It determines how data is distributed across the nodes in the cluster.
    2. The partition key is hashed using a hash function.
    3. The resulting hash value is compared to the token ranges owned by each node.
    4. The partition (group of related rows) is assigned to the node whose token range includes that hash value.
    5. This ensures that all rows with the same partition key are stored together on the same node, enabling efficient data retrieval

- In Cassandra, the partition key and clustering key serve different purposes within the primary key:

    1. Partition Key:
        Determines the node where the data is stored by being hashed and mapped to a token range.
        Groups related rows into a partition stored together on the same node.
        Ensures data distribution across the cluster.
    2. Clustering Key (or clustering columns):
        Defines the order of rows within a partition.
        Organizes how rows are sorted and stored inside the partition.
        Helps efficiently query and retrieve rows within the same partition.