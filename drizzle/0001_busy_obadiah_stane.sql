CREATE TABLE `fmr_master_user_audio` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`recordId` varchar(256) NOT NULL,
	`path` varchar(512) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fmr_master_user_audio_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fmr_master_user_record` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`recordsId` varchar(256) NOT NULL,
	`stationId` bigint NOT NULL,
	`ipAddress` varchar(256),
	`startTime` date NOT NULL,
	`endTime` date NOT NULL,
	`frequncy` varchar(256) NOT NULL,
	`dayofweek` varchar(256) NOT NULL,
	`dailyStartTime` time(6) NOT NULL,
	`dailyEndTime` time(6) NOT NULL,
	`channel` varchar(256) NOT NULL,
	`userId` varchar(256) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fmr_master_user_record_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fmr_master_user_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userId` varchar(256) NOT NULL,
	`name` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`role` varchar(256),
	`email` varchar(256),
	CONSTRAINT `fmr_master_user_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `fmr-master-app_user`;--> statement-breakpoint
CREATE INDEX `record_id_idx` ON `fmr_master_user_audio` (`id`);--> statement-breakpoint
CREATE INDEX `station_id_idx` ON `fmr_master_user_record` (`stationId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `fmr_master_user_record` (`userId`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `fmr_master_user_user` (`name`);