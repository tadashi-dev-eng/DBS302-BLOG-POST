---
title: "Redis Architecture"
---

Redis is an in-memory data structure store with single-threaded event loop architecture, persistence options, and replication. Redis follows the client server model via a TCP. 

RESP : Redis Serialization Protocal that is text based used by redis client to communicate with the redis server.

#### 3 Pillars of Redis 

1. In-memory storage (RAM) : Redis stroes the data in RAM that makes the fetching time nanosecond

2. Non-blocking I/O (Multiplexing): Redis works on single threats meaning it uses Reactor pattern. However it never stays idel waiting for client to response despite being single thread. It uses the system call like epoll(linux) and kqueue(MAC) to handle thousands of connection simultanously.
 
3. Single-threaded execution (Atomic) : No context switching, no mutex locking, no race conditions. One command at a time CPU cache stays warm.

```
Note

Multi-threaded DBs (MySQL) waste time context-switching and waiting on locks. Redis sidesteps this entirely — concurrency is managed by a queue, not locks. Result: millions of ops/sec.
```

```
RESP — Redis Serialization Protocol

Binary-safe, text-based protocol used by all Redis clients (Java, Python, Node.js, Go) to communicate with the server. The Reactor Pattern handles connections; RESP is the language spoken over them.
```



