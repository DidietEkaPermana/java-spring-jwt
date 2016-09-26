package com.ecomindo;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@Order(-1)
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private Environment env;
	
	@Autowired
	DataSource datasource;
	
	@Autowired
    public void globalUserDetails(final AuthenticationManagerBuilder auth) throws Exception {
        // @formatter:off
		//auth.inMemoryAuthentication().withUser("john").password("123").roles("USER").and().withUser("tom")
		//		.password("111").roles("ADMIN");
		auth.jdbcAuthentication().dataSource(datasource)//;
		.usersByUsernameQuery("select email, password, 'true' from auth_user where email=?")
		.authoritiesByUsernameQuery("select c.email, a.group_name from auth_group a " +  
			"join auth_user_group b on a.group_id = b.group_id " +
			"join auth_user c on b.user_id = c.user_id " +
			"where c.email = ?");
		//.groupAuthoritiesByUsername(query);
		// @formatter:on
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
//		http.authorizeRequests().antMatchers("/login").permitAll().anyRequest().authenticated().and().formLogin()
//				.permitAll();
		// @formatter:on
    }
    
    @Bean
    public  DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(env.getProperty("jdbc.url"));
        dataSource.setUsername(env.getProperty("jdbc.user"));
        dataSource.setPassword(env.getProperty("jdbc.pass"));
        return dataSource;
    }

}
