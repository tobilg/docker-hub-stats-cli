# docker-hub-stats-cli
CLI for image download statistics from Docker Hub

## Installation
To install the package, run

```bash
$ npm i -g docker-hub-stats-cli
```

## Usage

```text
$ docker-hub-stats -h
Usage: docker-hub-stats [options]

Options:
  -V, --version            output the version number
  -i, --image <imageName>  get information about a specific Docker Hub image
  -u, --user <userName>    get information about a Docker Hub user's images
  -t, --tags               list the tags of a Docker Hub image
  -o, --output <format>    define the output format (allowed values: csv, tsv, json). Default: json
  -h, --help               output usage information
```

### Get Docker Hub user statistics

```text
$ docker-hub-stats -u tobilg -o tsv
user    name    starCount      pullCount       lastUpdateTimestamp     description
tobilg  marathon-slack  2       378305  2018-01-29T17:06:34.571816Z     Listen to Marathon's Event Bus and send selected event types to a Slack WebHook
tobilg  mesos-dns       4       210498  2016-10-17T07:26:36.492437Z     A Mesos DNS Docker image
tobilg  expose-socket   0       192067  2017-05-05T08:19:31.135493Z     Exposes the Docker socket
tobilg  zookeeper-webui 11      155603  2016-10-27T08:05:48.491673Z     Docker image for using `zk-web` as ZooKeeper Web UI
tobilg  mini-webserver  2       130083  2017-06-13T12:28:26.787927Z     Provides a server (via Express.js) to expose static files from the Docker host via HTTP
tobilg  minio-dcos      0       83191   2017-06-20T06:36:59.293300Z     minio on DC/OS
...
```

### Get Docker Hub image statistics

```text
$ docker-hub-stats -i tobilg/marathon-slack -o csv
user,name,starCount,pullCount,lastUpdateTimestamp,description
tobilg,marathon-slack,2,378310,2018-01-29T17:06:34.571816Z,Listen to Marathon's Event Bus and send selected event types to a Slack WebHook
```

### Get tags of a Docker image

```text
$ docker-hub-stats -i tobilg/marathon-slack --tags -o csv
name,size,lastUpdateTimestamp
0.5.1,21840029,2017-06-13T12:28:26.459775Z
latest,21839979,2017-06-13T12:26:04.512323Z
master,21840250,2017-06-13T09:05:00.933940Z
0.5.0,21840091,2017-06-13T09:02:29.843628Z
0.4.0,10785905,2017-03-28T12:43:40.990684Z
0.3.0,10548396,
0.2.0,108057742,
0.1.0,110399883,
```
