package com.cars.app.repository;

import com.cars.app.domain.Superuser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Superuser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuperuserRepository extends JpaRepository<Superuser, Long> {

}
