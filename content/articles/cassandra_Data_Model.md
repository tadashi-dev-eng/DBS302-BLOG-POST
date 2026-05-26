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

## Collection Types in Cassandra

- Cassandra supports four main collection types: set (unique values of the same datatype), list (ordered, non-unique values of the same datatype), map (key-value pairs with unique keys), and tuple (fixed-length set of values of different types).
- Collections are useful for scenarios like tagging blog articles, where multiple tags can be stored as a single collection datatype.

# Advanced Collection Features

- User-defined types (UDTs) allow extending Cassandra’s data model by creating custom types.
- Collections can be nested by marking them as frozen, which serializes the collection as binary data; this is required for UDTs but not for tuples in newer Cassandra versions.

## Additional Cassandra Data Model Details

- Cassandra columns are actually triples including a hidden timestamp used for conflict resolution and replication management.
- Cassandra supports TTL (time to live) at the column level, allowing data to expire automatically after a specified duration.

- The frozen keyword in Cassandra is used to mark a collection or user-defined type (UDT) so that it is treated as a single, immutable value. When a collection is frozen:

    1. Cassandra serializes and stores the entire collection as a blob (binary large object).
    2. This allows nesting collections within other collections or UDTs.
    3. It ensures the collection is stored and retrieved as a whole, rather than allowing partial updates to individual elements.

