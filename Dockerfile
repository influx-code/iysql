FROM debian:8-slim

ADD sources.list    /etc/apt/sources.list
COPY requirments.txt /root/requirments.txt

RUN apt-get update && apt-get install -y \
    wget git cmake libaio-dev libffi-dev libglib2.0-0 libglib2.0-dev python3 python3-pip && \
    wget https://repo.percona.com/apt/percona-release_0.1-6.$(lsb_release -sc)_all.deb && \
    dpkg -i percona-release_0.1-6.$(lsb_release -sc)_all.deb && \
    apt-get update && apt-get install -y percona-server-server-5.6 && \
    cmake -DBUILD_CONFIG=mysql_release -DCMAKE_BUILD_TYPE=debug -DCMAKE_INSTALL_PREFIX=/usr/local/sqlparser ./ && \
    make && make install && git clone https://github.com/Meituan-Dianping/SQLAdvisor.git && \
    cd SQLAdvisor/sqladvisor/ && cmake -DCMAKE_BUILD_TYPE=debug ./ && make && \
    mkdir /root/iysqlsofts && chmod a+x sqladvisor && mv sqladvisor /root/iysqlsofts/sqladvisor && \
    wget https://github.com/XiaoMi/soar/releases/download/${tag}/soar.linux-amd64 -O soar && \
    chmod a+x soar && mv soar /root/iysqlsofts/soar && \
    pip3 install -r /root/requirments.txt && \
    rm -rf /root/.cache && apt-get autoclean && \
    apt-get --purge autoremove && \
    rm -rf /tmp/* /var/lib/apt/* /var/cache/* /var/log/*

ENV soar=/root/iysqlsofts/soar sqladvisor=/root/iysqlsofts/sqladvisor enviroment=production

COPY iysql /root/iysql

ENTRYPOINT python3 /root/iysql/app.py

EXPOSE 8080
