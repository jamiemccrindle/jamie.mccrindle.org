import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, KotlinCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Installing Oracle Java 7 using Chef</PostTitleH1>
            <div>
                <p>
                    I just spent some time getting Oracle's Java 7 to install on Ubuntu using Chef. 
                    After several dead ends, the solution ended up being relatively simple:
                </p>
                <KotlinCode>{`
#
# Cookbook Name:: java7
# Recipe:: default
#

apt_repository "webupd8team" do
  uri "http://ppa.launchpad.net/webupd8team/java/ubuntu"
  components ['main']
  distribution node['lsb']['codename']
  keyserver "keyserver.ubuntu.com"
  key "EEA14886"
  deb_src true

end

# could be improved to run only on update
execute "accept-license" do
  command "echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections"
end

package "oracle-java7-installer" do
  action :install
end

package "oracle-java7-set-default" do
  action :install
end
`.trim()}</KotlinCode>
            </div>
        </PostArticle>
    </PostDiv>
))
